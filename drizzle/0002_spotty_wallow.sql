ALTER TABLE `articles` MODIFY COLUMN `tags` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `impact` text DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `registrations` MODIFY COLUMN `skills` text DEFAULT ('[]');