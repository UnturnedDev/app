import { env } from '@/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { relations } from './relations';

const globalForDB = globalThis as unknown as { pool?: Pool };

const pool =
    globalForDB.pool ?? new Pool({ connectionString: env.DATABASE_URL });

if (process.env.NODE_ENV !== 'production') globalForDB.pool = pool;

export const db = drizzle({
    client: pool,
    relations: relations,
});
