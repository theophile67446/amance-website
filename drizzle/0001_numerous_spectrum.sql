CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`coverImage` text,
	`category` enum('actualites','terrain','communique','rapport') NOT NULL DEFAULT 'actualites',
	`published` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`author` varchar(255) DEFAULT 'Équipe AMANCE',
	`tags` json DEFAULT ('[]'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(30),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('nouveau','lu','traite') NOT NULL DEFAULT 'nouveau',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text NOT NULL,
	`fullDescription` text,
	`coverImage` text,
	`category` enum('humanitaire','sante','communautaire','conservation') NOT NULL,
	`status` enum('en_cours','termine','planifie') NOT NULL DEFAULT 'en_cours',
	`location` varchar(255),
	`startDate` timestamp,
	`endDate` timestamp,
	`beneficiaries` int DEFAULT 0,
	`impact` json DEFAULT ('[]'),
	`featured` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('benevole','partenaire') NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(30),
	`organization` varchar(255),
	`city` varchar(100),
	`country` varchar(100) DEFAULT 'Cameroun',
	`motivation` text,
	`skills` json DEFAULT ('[]'),
	`availability` varchar(100),
	`partnerType` varchar(100),
	`website` varchar(255),
	`status` enum('nouveau','contacte','actif','inactif') NOT NULL DEFAULT 'nouveau',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `registrations_id` PRIMARY KEY(`id`)
);
