import "dotenv/config";
import { getDb } from '../server/db';

async function alter() {
  const db = await getDb();
  if (!db) {
    console.log("No DB available");
    return;
  }
  const queries = [
    'ALTER TABLE `articles` ADD `titleEn` varchar(500)',
    'ALTER TABLE `articles` ADD `excerptEn` text',
    'ALTER TABLE `articles` ADD `contentEn` text',
    'ALTER TABLE `projects` ADD `titleEn` varchar(500)',
    'ALTER TABLE `projects` ADD `descriptionEn` text',
    'ALTER TABLE `projects` ADD `fullDescriptionEn` text'
  ];
  for (const q of queries) {
    try {
      await db.execute(q);
      console.log('Executed:', q);
    } catch(e) {
      console.log('Skipped (already exists perhaps):', q);
    }
  }
}

alter().then(() => {
  console.log("Done");
  process.exit(0);
}).catch(console.error);
