import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '../data/env/server';
import * as schema from "./schema"

// const sql = neon(process.env.DATABASE_URL as string); not type safe, use when t3-oss not installed
const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql, {schema});





