import "dotenv/config";
import { getDb } from "./server/db";

async function main() {
  const db = await getDb();
  if (!db) return;
  try {
    await db.execute("DESCRIBE contacts;" as any);
    console.log("Contacts exists");
    await db.execute("DESCRIBE registrations;" as any);
    console.log("Registrations exists");
  } catch (err) {
    console.error("Missing table:", err);
  }
}
main();
