import "dotenv/config";
import { getDb } from "./server/db";

async function main() {
  const db = await getDb();
  if (!db) return;
  const res = await db.execute("SHOW TABLES;" as any);
  console.log("Tables:", JSON.stringify(res, null, 2));
}
main();
