import "dotenv/config";
import { getDb } from "./server/db";

async function main() {
  const db = await getDb();
  if (!db) return;
  try {
    const res = await db.execute("DESCRIBE team_members;" as any);
    console.log("Describe team_members:", JSON.stringify(res[0], null, 2));
  } catch (err) {
    console.error("Describe error:", err);
  }
}
main();
