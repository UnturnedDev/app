import { auth } from '@/auth';
import { getSession } from '@/auth/server';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getSession();

    if (!session) {
        return (
            <main>
                <h1>Sign in to get started</h1>
                <form
                    action={async () => {
                        'use server';
                        const res = await auth.api.signInSocial({
                            body: {
                                provider: 'discord',
                            },
                        });
                        if (!res.url) {
                            throw new Error(
                                'No URL returned from socialSignIn',
                            );
                        }

                        redirect(res.url);
                    }}
                >
                    <Button type="submit">Sign in w/ Discord</Button>
                </form>
            </main>
        );
    }

    return (
        <main>
            <h1>Welcome back, {session.user.name}!</h1>
            <form
                action={async () => {
                    'use server';
                    const res = await auth.api.signOut({
                        headers: await headers(),
                    });

                    if (!res.success) {
                        throw new Error('Failed to sign out');
                    }

                    revalidatePath('/', 'page');
                }}
            >
                <Button type="submit">Sign out</Button>
            </form>
        </main>
    );
}
