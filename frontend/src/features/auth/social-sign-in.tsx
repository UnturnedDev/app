'use client';

import { authClient } from '@/auth/client';
import { DiscordIcon } from '@/components/icons/discord-icon';
import { GitHubIcon } from '@/components/icons/github-icon';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { toast } from 'sonner';

export function SocialSignIn() {
    const [active, setActive] = useState<string | null>(null);

    function onProviderClick(provider: string) {
        setActive(provider);
        authClient.signIn
            .social({
                provider,
            })
            .catch((err) => {
                const msg =
                    err?.message ??
                    'An unknown error occured. Please try again...';

                toast.error('Oops! An error occurred trying to sign in!', {
                    description: msg,
                });
            })
            .finally(() => setActive(null));
    }

    return (
        <div className="grid sm:grid-cols-2 w-full gap-3">
            <Button
                disabled={!!active}
                variant={'outline'}
                onClick={() => onProviderClick('discord')}
            >
                {active == 'discord' ? <Spinner /> : <DiscordIcon />}
                Sign In with Discord
            </Button>
            <Button
                disabled={!!active}
                variant={'outline'}
                onClick={() => onProviderClick('github')}
            >
                {active == 'github' ? <Spinner /> : <GitHubIcon />}
                Sign In with GitHub
            </Button>
        </div>
    );
}
