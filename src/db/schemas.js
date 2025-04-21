import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const countersTable = sqliteTable("counters", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
	count: integer("count").notNull(),
	createdAt: text("created_at")
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
});

export { countersTable };
