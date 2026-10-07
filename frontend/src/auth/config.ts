import { env } from '@/env';
import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { admin } from 'better-auth/plugins/admin';
import { organization } from 'better-auth/plugins/organization';
import { jwt } from 'better-auth/plugins/jwt';
import { nextCookies } from 'better-auth/next-js';
import { db } from '@/server/db';
import * as schema from '@/server/db/schema';

export const auth = betterAuth({
    appName: 'Unturned.dev',
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
    database: drizzleAdapter(db, {
        provider: 'pg',
        usePlural: true,
        schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        discord: {
            clientId: env.BETTER_AUTH_DISCORD_CLIENT_ID,
            clientSecret: env.BETTER_AUTH_DISCORD_CLIENT_SECRET,
        },
        github: {
            clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
        },
    },
    plugins: [admin(), organization(), jwt(), nextCookies()],
});
