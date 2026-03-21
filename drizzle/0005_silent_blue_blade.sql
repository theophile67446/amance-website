CREATE TABLE `team_members` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `title` varchar(255),
  `location` varchar(255),
  `image` text,
  `bio` text,
  `displayOrder` int NOT NULL DEFAULT 0,
  `active` boolean NOT NULL DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `team_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `team_members_active_display_idx` ON `team_members` (`active`,`displayOrder`);
