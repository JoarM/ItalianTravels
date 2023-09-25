import { relations } from "drizzle-orm";
import { mysqlTable, bigint, varchar, serial, int } from "drizzle-orm/mysql-core";

export const user = mysqlTable("auth_user", {
	id: varchar("id", {
		length: 256
	}).primaryKey()

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

export const flights = mysqlTable("flights", {
    origin: varchar("origin", { length: 3 }).references(() => airports.code, {
		onDelete: "cascade"
	}),
    destination: varchar("destination", { length: 3 }).references(() => airports.code, {
		onDelete: "cascade"
	}),
    duration: bigint("duration", { mode: "number" }), //Flight duration in minutes
});

export const airportsRelations = relations(airports, ({ many }) => ({
	departures: many(flights),
}));

export const flightsRelations = relations(flights, ({ one }) => ({
	origin: one(airports, {
		references: [airports.code],
		fields: [flights.origin],
		relationName: "departures"
	})
}));
  

