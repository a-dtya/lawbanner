import { relations } from "drizzle-orm";
import { pgTable, text, uuid, timestamp, index, boolean, primaryKey } from "drizzle-orm/pg-core";

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

export const PolicyBannerCustomisationTable = pgTable("policy_banner_customisation", {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(()=>ProductTable.id, {onDelete: "cascade"}),
    classPrefix: text("class_prefix"),
    locationMessage: text('location_message').default(
        'Hey there from {{country}}! We apply regional legal policies automatically.'
      ),
    bannerText: text('banner_text').default(
    'By using this site, you agree to our {{policy_type}} policy.'
    ),
    backgroundColor: text('background_color').default('#ffffff'),
    textColor: text('text_color').default('#000000'),
    fontSize: text('font_size').default('1rem'),
    position: text('position').default('body'),
    isSticky: boolean('is_sticky').default(true),
    showCloseButton: boolean('show_close_button').default(true),
    createdAt,
    updatedAt,
    
})
    
export const productRelations = relations(ProductTable, ({ one, many }) => ({
    policyBannerCustomisation: one(PolicyBannerCustomisationTable),
    productViews: many(ProductViewsTable),
}));
    

export const policyBannerCustomisationRelations = relations(PolicyBannerCustomisationTable, ({ one }) => ({
    product: one(ProductTable, {
        fields: [PolicyBannerCustomisationTable.productId],
        references: [ProductTable.id],
    }),
}));


export const ProductViewsTable = pgTable('product_views', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => ProductTable.id, { onDelete: 'cascade' }),
  countryId: uuid('country_id').references(() => Countries.id),
  visitedAt: timestamp('visited_at', { withTimezone: true }).notNull().defaultNow(),
});

export const productViewsRelations = relations(ProductViewsTable, ({ one }) => ({
    product: one(ProductTable, {
        fields: [ProductViewsTable.productId],
        references: [ProductTable.id],
    }),
    country: one(Countries, {
        fields: [ProductViewsTable.countryId],
        references: [Countries.id],
    }),
}));

export const Countries = pgTable('countries', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  code: text('code'), // e.g., "IN", "US", "DE"
  countryGroupId: uuid('country_group_id').references(() => CountryGroups.id),
});

export const countriesRelations = relations(Countries, ({ one, many }) => ({
    countryGroup: one(CountryGroups, {
        fields: [Countries.countryGroupId],
        references: [CountryGroups.id],
    }),
    productViews: many(ProductViewsTable),
}));

export const CountryGroups = pgTable('country_groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'), // e.g., "GDPR", "Minimal", etc.
  description: text('description'),
});

export const countryGroupsRelations = relations(CountryGroups, ({ one, many }) => ({
    countries: many(Countries),
}));


export const CountryGroupPolicyOverrides = pgTable('country_group_policy_overrides', {
    productId: uuid('product_id')
        .references(() => ProductTable.id, { onDelete: 'cascade' }),
    countryGroupId: uuid('country_group_id')
        .references(() => CountryGroups.id, { onDelete: 'cascade' }),
    customPolicyUrl: text('custom_policy_url'), // Optional override
    customMessage: text('custom_message'),     // Optional region-specific message
    isBannerHidden: boolean('is_banner_hidden').default(false),
    createdAt,
    updatedAt,
}, table => ({
    pk: primaryKey({ columns: [table.productId, table.countryGroupId] })
}));

export const countryGroupPolicyOverridesRelations = relations(CountryGroupPolicyOverrides, ({ one }) => ({
    product: one(ProductTable, {
        fields: [CountryGroupPolicyOverrides.productId],
        references: [ProductTable.id],
    }),
    countryGroup: one(CountryGroups, {
        fields: [CountryGroupPolicyOverrides.countryGroupId],
        references: [CountryGroups.id],
    }),
}));
