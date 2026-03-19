import { getDb } from "../server/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function seedAdmin() {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Failed to connect to database");
      process.exit(1);
    }

    const email = "mimb.nout@gmail.com";
    const openId = "local-" + email.replace("@", "-").replace(".", "-");

    // Check if user already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing.length > 0) {
      console.log("✓ User already exists:", email);
      process.exit(0);
    }

    // Create admin user
    await db.insert(users).values({
      openId,
      name: "Admin AMANCE",
      email,
      loginMethod: "local",
      role: "admin",
    });

    console.log("✓ Admin user created successfully!");
    console.log("Email:", email);
    console.log("\nYou can now login with this email in the local login form.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
