CREATE TYPE "public"."tier" AS ENUM('free', 'basic', 'standard', 'premium');--> statement-breakpoint
CREATE TABLE "ai_generated_contents" (
	"product_id" uuid,
	"country_group_id" uuid,
	"type" text DEFAULT 'terms' NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"generated_by" text DEFAULT 'AI',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_generated_contents_product_id_country_group_id_pk" PRIMARY KEY("product_id","country_group_id")
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"code" text,
	"country_group_id" uuid
);
--> statement-breakpoint
CREATE TABLE "country_group_policy_overrides" (
	"product_id" uuid,
	"country_group_id" uuid,
	"custom_policy_url" text,
	"custom_message" text,
	"is_banner_hidden" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "country_group_policy_overrides_product_id_country_group_id_pk" PRIMARY KEY("product_id","country_group_id")
);
--> statement-breakpoint
CREATE TABLE "country_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "policy_banner_customisation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"class_prefix" text,
	"location_message" text DEFAULT 'Hey there from {{country}}! We apply regional legal policies automatically.',
	"banner_text" text DEFAULT 'By using this site, you agree to our {{policy_type}} policy.',
	"background_color" text DEFAULT '#ffffff',
	"text_color" text DEFAULT '#000000',
	"font_size" text DEFAULT '1rem',
	"position" text DEFAULT 'body',
	"is_sticky" boolean DEFAULT true,
	"show_close_button" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid,
	"country_id" uuid,
	"visited_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"stripe_subscription_item_id" text,
	"stripe_subscription_id" text,
	"stripe_customer_id" text,
	"tier" "tier" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_subscriptions_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
ALTER TABLE "ai_generated_contents" ADD CONSTRAINT "ai_generated_contents_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_generated_contents" ADD CONSTRAINT "ai_generated_contents_country_group_id_country_groups_id_fk" FOREIGN KEY ("country_group_id") REFERENCES "public"."country_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "countries" ADD CONSTRAINT "countries_country_group_id_country_groups_id_fk" FOREIGN KEY ("country_group_id") REFERENCES "public"."country_groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "country_group_policy_overrides" ADD CONSTRAINT "country_group_policy_overrides_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "country_group_policy_overrides" ADD CONSTRAINT "country_group_policy_overrides_country_group_id_country_groups_id_fk" FOREIGN KEY ("country_group_id") REFERENCES "public"."country_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_banner_customisation" ADD CONSTRAINT "policy_banner_customisation_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_views" ADD CONSTRAINT "product_views_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_views" ADD CONSTRAINT "product_views_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "products.clerk_user_id_index" ON "products" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX "user_subscriptions.clerk_user_id_index" ON "user_subscriptions" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX "user_subscriptions.stripe_customer_id_index" ON "user_subscriptions" USING btree ("stripe_customer_id");