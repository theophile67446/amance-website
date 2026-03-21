import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Articles/Blog table
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  titleEn: varchar("titleEn", { length: 500 }),
  excerpt: text("excerpt"),
  excerptEn: text("excerptEn"),
  content: text("content").notNull(),
  contentEn: text("contentEn"),
  coverImage: text("coverImage"),
  category: mysqlEnum("category", ["actualites", "terrain", "communique", "rapport"]).default("actualites").notNull(),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  author: varchar("author", { length: 255 }).default("Équipe AMANCE"),
  tags: text("tags"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

/**
 * Projects table
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  titleEn: varchar("titleEn", { length: 500 }),
  description: text("description").notNull(),
  descriptionEn: text("descriptionEn"),
  fullDescription: text("fullDescription"),
  fullDescriptionEn: text("fullDescriptionEn"),
  coverImage: text("coverImage"),
  category: mysqlEnum("category", ["humanitaire", "sante", "communautaire", "conservation"]).notNull(),
  status: mysqlEnum("status", ["en_cours", "termine", "planifie"]).default("en_cours").notNull(),
  location: varchar("location", { length: 255 }),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  beneficiaries: int("beneficiaries").default(0),
  impact: text("impact"),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Contact form submissions
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["nouveau", "lu", "traite"]).default("nouveau").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

/**
 * Volunteer/Partner registration
 */
export const registrations = mysqlTable("registrations", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["benevole", "partenaire"]).notNull(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  organization: varchar("organization", { length: 255 }),
  city: varchar("city", { length: 100 }),
  country: varchar("country", { length: 100 }).default("Cameroun"),
  motivation: text("motivation"),
  skills: text("skills"),
  availability: varchar("availability", { length: 100 }),
  // For partners
  partnerType: varchar("partnerType", { length: 100 }),
  website: varchar("website", { length: 255 }),
  status: mysqlEnum("status", ["nouveau", "contacte", "actif", "inactif"]).default("nouveau").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = typeof registrations.$inferInsert;
