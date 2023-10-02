CREATE TABLE `airports` (
	`code` varchar(3) NOT NULL,
	`city` varchar(64),
	CONSTRAINT `airports_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `arrivals` (
	`airport_code` varchar(3),
	`flight_id` bigint
);
--> statement-breakpoint
CREATE TABLE `departures` (
	`airport_code` varchar(3),
	`flight_id` bigint
);
--> statement-breakpoint
CREATE TABLE `flights` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`origin` varchar(3),
	`destination` varchar(3),
	`duration` bigint,
	CONSTRAINT `flights_id` PRIMARY KEY(`id`),
	CONSTRAINT `flights_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_key` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`hashed_password` varchar(255),
	CONSTRAINT `user_key_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `passengers` (
	`user_id` varchar(256),
	`flight_id` bigint
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` varchar(128) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL,
	CONSTRAINT `user_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auth_user` (
	`id` varchar(256) NOT NULL,
	`firstname` varchar(256),
	`lastname` varchar(256),
	CONSTRAINT `auth_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `arrivals` ADD CONSTRAINT `arrivals_airport_code_airports_code_fk` FOREIGN KEY (`airport_code`) REFERENCES `airports`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `arrivals` ADD CONSTRAINT `arrivals_flight_id_flights_id_fk` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `departures` ADD CONSTRAINT `departures_airport_code_airports_code_fk` FOREIGN KEY (`airport_code`) REFERENCES `airports`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `departures` ADD CONSTRAINT `departures_flight_id_flights_id_fk` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `flights` ADD CONSTRAINT `flights_origin_airports_code_fk` FOREIGN KEY (`origin`) REFERENCES `airports`(`code`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `flights` ADD CONSTRAINT `flights_destination_airports_code_fk` FOREIGN KEY (`destination`) REFERENCES `airports`(`code`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_key` ADD CONSTRAINT `user_key_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `passengers` ADD CONSTRAINT `passengers_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `passengers` ADD CONSTRAINT `passengers_flight_id_flights_id_fk` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_session` ADD CONSTRAINT `user_session_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;