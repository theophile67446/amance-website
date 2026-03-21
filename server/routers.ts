import { COOKIE_NAME } from "@shared/const";
import { timingSafeEqual } from "node:crypto";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { ENV } from "./_core/env";
import { publicProcedure, router, adminProcedure, protectedProcedure } from "./_core/trpc";
import { sdk } from "./_core/sdk";
import { z } from "zod";
import { getDb } from "./db";
import { contacts, registrations, articles, projects, users } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";
import { eq, desc, and } from "drizzle-orm";

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

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
};

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
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(1).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const normalizedEmail = input.email.trim().toLowerCase();
        let user;

        if (ENV.isProduction) {
          if (!ENV.localAdminEmail || !ENV.localAdminPassword) {
            throw new Error("Local admin login is not configured for production");
          }

          if (normalizedEmail !== ENV.localAdminEmail.trim().toLowerCase()) {
            throw new Error("Invalid credentials");
          }

          if (!input.password || !safeEqual(input.password, ENV.localAdminPassword)) {
            throw new Error("Invalid credentials");
          }

          user = await db
            .select()
            .from(users)
            .where(eq(users.email, ENV.localAdminEmail.trim()))
            .limit(1);

          if (user.length === 0) {
            const openId = "local-" + ENV.localAdminEmail.trim().replace("@", "-").replaceAll(".", "-");
            await db.insert(users).values({
              openId,
              name: "Admin AMANCE",
              email: ENV.localAdminEmail.trim(),
              loginMethod: "local",
              role: "admin",
            });
            user = await db
              .select()
              .from(users)
              .where(eq(users.email, ENV.localAdminEmail.trim()))
              .limit(1);
          }
        } else {
          user = await db
            .select()
            .from(users)
            .where(eq(users.email, input.email))
            .limit(1);

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

    adminList: adminProcedure
      .query(async () => {
        const db = await getDb();
        if (!db) return [];
        return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
      }),

    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["nouveau", "lu", "traite"]),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(contacts).set({ status: input.status }).where(eq(contacts.id, input.id));
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

    adminList: adminProcedure
      .query(async () => {
        const db = await getDb();
        if (!db) return [];
        return await db.select().from(registrations).orderBy(desc(registrations.createdAt));
      }),

    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["nouveau", "contacte", "actif", "inactif"]),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(registrations).set({ status: input.status }).where(eq(registrations.id, input.id));
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

        const conditions = [eq(articles.published, true)];
        if (input?.category) {
          conditions.push(eq(articles.category, input.category));
        }

        const results = await db.select()
          .from(articles)
          .where(and(...conditions))
          .orderBy(desc(articles.publishedAt));

        // Fallback: if no article is published yet, return latest entries so public pages are not empty.
        if (results.length === 0) {
          const fallbackConditions = [] as any[];
          if (input?.category) {
            fallbackConditions.push(eq(articles.category, input.category));
          }
          const fallbackResults = await db.select()
            .from(articles)
            .where(fallbackConditions.length > 0 ? and(...fallbackConditions) : undefined)
            .orderBy(desc(articles.createdAt));
          return fallbackResults;
        }

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

    adminList: adminProcedure
      .query(async () => {
        const db = await getDb();
        if (!db) return [];
        return await db.select().from(articles).orderBy(desc(articles.publishedAt));
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        titleEn: z.string().optional(),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        excerptEn: z.string().optional(),
        content: z.string().min(1),
        contentEn: z.string().optional(),
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
        titleEn: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        excerptEn: z.string().optional(),
        content: z.string().optional(),
        contentEn: z.string().optional(),
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

        const conditions = [];
        if (input?.category) {
          conditions.push(eq(projects.category, input.category));
        }
        if (input?.featured) {
          conditions.push(eq(projects.featured, true));
        }

        const results = await db.select()
          .from(projects)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(desc(projects.createdAt));

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

    adminList: adminProcedure
      .query(async () => {
        const db = await getDb();
        if (!db) return [];
        const results = await db.select().from(projects).orderBy(desc(projects.createdAt));
        return results.map(normalizeProject);
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        titleEn: z.string().optional(),
        slug: z.string().min(1),
        description: z.string().min(1),
        descriptionEn: z.string().optional(),
        fullDescription: z.string().optional(),
        fullDescriptionEn: z.string().optional(),
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
        titleEn: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        descriptionEn: z.string().optional(),
        fullDescription: z.string().optional(),
        fullDescriptionEn: z.string().optional(),
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
