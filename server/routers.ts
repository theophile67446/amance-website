import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure, protectedProcedure } from "./_core/trpc";
import { sdk } from "./_core/sdk";
import { z } from "zod";
import { getDb } from "./db";
import { contacts, registrations, articles, projects, users } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";
import { eq, desc } from "drizzle-orm";

type ProjectImpactStat = {
  value: string;
  label: string;
};

const parseJsonArray = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (typeof value !== "string" || value.trim() === "") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
};

const normalizeProject = <T extends { impact?: unknown; sdgs?: unknown }>(project: T) => ({
  ...project,
  impact: parseJsonArray<ProjectImpactStat>(project.impact),
  sdgs: parseJsonArray<string>(project.sdgs),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    // Local login for development
    localLogin: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Find user by email
        let user = await db
          .select()
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1);

        // If user doesn't exist, create it as admin
        if (user.length === 0) {
          const openId = "local-" + input.email.replace("@", "-").replace(".", "-");
          await db.insert(users).values({
            openId,
            name: "Admin AMANCE",
            email: input.email,
            loginMethod: "local",
            role: "admin",
          });
          user = await db
            .select()
            .from(users)
            .where(eq(users.email, input.email))
            .limit(1);
        }

        if (user.length === 0) {
          throw new Error("Failed to create or find user");
        }

        const sessionToken = await sdk.createSessionToken(user[0].openId, {
          name: user[0].name || user[0].email || "Admin AMANCE",
        });
        const cookieOptions = getSessionCookieOptions(ctx.req);

        ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);

        return { success: true, user: user[0] };
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(1),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (db) {
          await db.insert(contacts).values({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone ?? null,
            subject: input.subject,
            message: input.message,
          });
        }
        // Notify the owner
        await notifyOwner({
          title: `📩 Nouveau message de contact : ${input.subject}`,
          content: `De : ${input.firstName} ${input.lastName} (${input.email})\n\nSujet : ${input.subject}\n\nMessage : ${input.message}`,
        });
        return { success: true };
      }),
  }),

  registration: router({
    submit: publicProcedure
      .input(z.object({
        type: z.enum(["benevole", "partenaire"]),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        organization: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        motivation: z.string().optional(),
        skills: z.string().optional(),
        availability: z.string().optional(),
        partnerType: z.string().optional(),
        website: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (db) {
          await db.insert(registrations).values({
            type: input.type,
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone ?? null,
            organization: input.organization ?? null,
            city: input.city ?? null,
            country: input.country ?? "Cameroun",
            motivation: input.motivation ?? null,
            skills: input.skills ?? null,
            availability: input.availability ?? null,
            partnerType: input.partnerType ?? null,
            website: input.website ?? null,
          });
        }
        const typeLabel = input.type === "benevole" ? "Bénévole" : "Partenaire";
        await notifyOwner({
          title: `🙋 Nouvelle inscription ${typeLabel} : ${input.firstName} ${input.lastName}`,
          content: `Type : ${typeLabel}\nNom : ${input.firstName} ${input.lastName}\nEmail : ${input.email}\nOrganisation : ${input.organization ?? "N/A"}\nMotivation : ${input.motivation ?? "N/A"}`,
        });
        return { success: true };
      }),
  }),

  articles: router({
    list: publicProcedure
      .input(z.object({
        category: z.enum(["actualites", "terrain", "communique", "rapport"]).optional(),
        featured: z.boolean().optional(),
      }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];

        let query = db.select().from(articles).where(eq(articles.published, true));
        if (input?.category) {
          query = query.where(eq(articles.category, input.category)) as any;
        }
        const results = await query.orderBy(desc(articles.publishedAt));
        return results;
      }),

    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const result = await db.select().from(articles).where(eq(articles.slug, input));
        return result[0] || null;
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        coverImage: z.string().optional(),
        category: z.enum(["actualites", "terrain", "communique", "rapport"]),
        author: z.string().optional(),
        tags: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db.insert(articles).values({
          ...input,
          published: false,
          author: input.author || "Équipe AMANCE",
        });
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        coverImage: z.string().optional(),
        category: z.enum(["actualites", "terrain", "communique", "rapport"]).optional(),
        published: z.boolean().optional(),
        author: z.string().optional(),
        tags: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { id, ...data } = input;
        const updateData: any = { ...data };
        if (data.published && !updateData.publishedAt) {
          updateData.publishedAt = new Date();
        }

        await db.update(articles).set(updateData).where(eq(articles.id, id));
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db.delete(articles).where(eq(articles.id, input));
        return { success: true };
      }),
  }),

  projects: router({
    list: publicProcedure
      .input(z.object({
        category: z.enum(["humanitaire", "sante", "communautaire", "conservation"]).optional(),
        featured: z.boolean().optional(),
      }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];

        let query = db.select().from(projects);
        if (input?.category) {
          query = query.where(eq(projects.category, input.category)) as any;
        }
        if (input?.featured) {
          query = query.where(eq(projects.featured, true)) as any;
        }
        const results = await query.orderBy(desc(projects.createdAt));
        return results.map(normalizeProject);
      }),

    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const result = await db.select().from(projects).where(eq(projects.slug, input));
        return result[0] ? normalizeProject(result[0]) : null;
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().min(1),
        fullDescription: z.string().optional(),
        coverImage: z.string().optional(),
        category: z.enum(["humanitaire", "sante", "communautaire", "conservation"]),
        status: z.enum(["en_cours", "termine", "planifie"]).optional(),
        location: z.string().optional(),
        beneficiaries: z.number().optional(),
        impact: z.string().optional(),
        featured: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db.insert(projects).values({
          ...input,
          status: input.status || "en_cours",
          featured: input.featured || false,
        });
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        fullDescription: z.string().optional(),
        coverImage: z.string().optional(),
        category: z.enum(["humanitaire", "sante", "communautaire", "conservation"]).optional(),
        status: z.enum(["en_cours", "termine", "planifie"]).optional(),
        location: z.string().optional(),
        beneficiaries: z.number().optional(),
        impact: z.string().optional(),
        featured: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { id, ...data } = input;
        await db.update(projects).set(data).where(eq(projects.id, id));
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db.delete(projects).where(eq(projects.id, input));
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
