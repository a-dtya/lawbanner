import { pgTable, text, uuid, timestamp, index } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", {withTimezone: true}).notNull().defaultNow();
const updatedAt = timestamp("updated_at", {withTimezone: true}).notNull().defaultNow().$onUpdate(() => new Date());

export const ProductTable = pgTable("products", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserId: text("clerk_user_id").notNull(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    description: text("description").notNull(),
    createdAt,
    updatedAt,
}, table => ({
    clerkUserIdIndex: index("products.clerk_user_id_index").on(table.clerkUserId),
}));
