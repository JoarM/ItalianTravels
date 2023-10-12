import { mysqlTable, bigint, varchar, unique } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const user = mysqlTable("auth_user", {
	id: varchar("id", {
		length: 256
	}).primaryKey(),
	email: varchar("email", { length: 128 }).unique(),
	firstname: varchar("firstname", {
		length: 256
	}),
	lastname: varchar("lastname", {
		length: 256,
	}),
});

export const insertUserSchema = z.object({
	email: z.string()
	.email({ message: "Please enter a valid email" }),
	firstname: z.string()
	.min(1, { message: "You need to enter a firstname" })
	.max(256, { message: "Firstname can't be more than 256 characters" }),
	lastname: z.string()
	.min(1, { message: "You need to enter a lastname" })
	.max(256, { message: "Lastname can't be more than 256 characters" }),
	password: z.string()
	.min(6, "Password needs to be atleast 6 characthers")
	.max(64, "Password cant be more than 64 characthers")
	.regex(/[A-Z]/, { message: "Password must include uppercase letter" })
	.regex(/[a-z]/, { message: "Password must include lowercase letter" })
	.regex(/[0-9]/, { message: "Password must include number" }),
});

export const signinSchema = z.object({
	email: z.string()
	.min(1),
	password: z.string()
	.min(1)
});

export const key = mysqlTable("user_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});

export const session = mysqlTable("user_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const airports = mysqlTable("airports", {
    code: varchar("code", { length: 3 }).primaryKey(),
    city: varchar("city", { length: 64 }),
});

export const arrivals = mysqlTable("arrivals", {
	airport_code: varchar("airport_code", { length: 3 }).references(() => airports.code),
	flight_id: bigint("flight_id", { mode: "number" }).references(() => flights.id),
});

export const departures = mysqlTable("departures", {
	airport_code: varchar("airport_code", { length: 3 }).references(() => airports.code),
	flight_id: bigint("flight_id", { mode: "number" }).references(() => flights.id),
});

export const flights = mysqlTable("flights", {
	id: bigint("id", { mode: "number" }).unique().autoincrement().unique().primaryKey(),
    origin: varchar("origin", { length: 3 }).references(() => airports.code, {
		onDelete: "cascade"
	}),
    destination: varchar("destination", { length: 3 }).references(() => airports.code, {
		onDelete: "cascade"
	}),
    duration: bigint("duration", { mode: "number" }), //Flight duration in minutes
});

export const insertFlightSchema = z.object({
	origin: z.string().length(3, { message: "Incorrect origin code format" }),
	destination: z.string().length(3, { message: "Incorrect destination code format" }),
	duration: z.number().min(10, { message: "Fligths cant be shorter than 10 minutes" }),
});

export const passengers = mysqlTable("passengers", {
	user_id: varchar("user_id", { length: 256 }).references(() => user.id),
	flight_id: bigint("flight_id", { mode: "number" }).references(() => flights.id),
}, (t) => ({
	unq: unique().on(t.user_id, t.flight_id),
}));

