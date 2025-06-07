import { defineConfig } from "drizzle-kit";
import { env } from "../data/env/server";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  strict: true,
  verbose: true,
  dbCredentials:{
    url:env.DATABASE_URL
  }
});
