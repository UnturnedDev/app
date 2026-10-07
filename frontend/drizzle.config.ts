import { env } from '@/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/server/db/schema.ts',
    dbCredentials: {
        url: env.DATABASE_URL,
    },
});
