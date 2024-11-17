// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", (t) => ({
	id: t.integer().primaryKey(),
	name: t.text().notNull(),
	email: t.text().unique().notNull(),
}));

export const ideasTable = sqliteTable("ideas", (t) => ({
	id: t.integer().primaryKey(),
	text: t.text().notNull(),
	authorId: t
		.integer()
		.references(() => usersTable.id)
		.notNull(),
	createdAt: t
		.integer({ mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
}));

export const thingsTable = sqliteTable("things", (t) => ({
	id: t.integer().primaryKey(),
	ideaId: t.integer().references(() => ideasTable.id),
	plan: t.text().notNull().default(""),
	currentStage: t.text().notNull().default("idea"),
}));
