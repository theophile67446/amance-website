import "dotenv/config";
import { getDb } from "./server/db";

async function main() {
  const db = await getDb();
  if (!db) return;
  try {
    const query = "SELECT id, name, role, title, location, image, bio, displayOrder, active, createdAt, updatedAt FROM team_members ORDER BY displayOrder ASC, id ASC";
    const res = await db.execute(query as any);
    console.log("Fallback query success:", res[0]);
  } catch (err) {
    console.error("Fallback query error:", err);
  }
}
main();
