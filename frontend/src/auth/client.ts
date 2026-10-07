'use client';

import { env } from '@/env';
import { createAuthClient } from 'better-auth/react';
import {
    adminClient,
    organizationClient,
    jwtClient,
} from 'better-auth/client/plugins';

export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
    plugins: [adminClient(), organizationClient(), jwtClient()],
});
