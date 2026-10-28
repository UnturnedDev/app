import { getSession } from '@/auth/server';
import { notFound, redirect } from 'next/navigation';
import 'server-only';
import { hasRole } from './roles';

export async function requireRole(role: string, callbackURL: string) {
    const session = await getSession();
    if (!session) {
        redirect(`/sign-in?callback_url=${encodeURIComponent(callbackURL)}`);
    }

    if (!hasRole(session.user, role)) {
        notFound();
    }

    return session;
}
