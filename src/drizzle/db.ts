import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '../data/env/server';

// const sql = neon(process.env.DATABASE_URL as string); not type safe, use when t3-oss not installed
const sql = neon(env.DATABASE_URL);
const db = drizzle({ client: sql });



