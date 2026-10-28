'use client';

import { authClient } from '@/auth/client';
import { BrandBlueIcon } from '@/components/icons/brand/blue-icon';
import { BrandBlueWordmark } from '@/components/icons/brand/blue-wordmark';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { filterNav, isActive, MAIN_NAV } from '@/lib/navigation';
import { hasRole } from '@/lib/roles';
import { cn } from '@/lib/utils';
import {
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
    ShieldIcon,
    UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function SiteNavbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 h-14 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto flex h-full max-w-6xl items-center gap-3 px-4 sm:px-6">
                {/* Mobile menu */}
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger
                        aria-label="Open menu"
                        className={cn(
                            buttonVariants({ variant: 'ghost', size: 'icon' }),
                            'md:hidden',
                        )}
                    >
                        <MenuIcon />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-1 px-4">
                            {MAIN_NAV.map((item) => {
                                const active = isActive(pathname, item);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        aria-current={
                                            active ? 'page' : undefined
                                        }
                                        className={cn(
                                            'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                            active
                                                ? 'bg-accent text-accent-foreground'
                                                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <BrandBlueIcon className="h-7 w-auto" />
                    <BrandBlueWordmark className="hidden h-7 w-auto sm:block" />
                    <span className="sr-only">Unturned.dev</span>
                </Link>

                {/* Desktop links */}
                <nav
                    aria-label="Main"
                    className="ml-4 hidden items-center gap-1 md:flex"
                >
                    {MAIN_NAV.map((item) => {
                        const active = isActive(pathname, item);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                                    active
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <UserMenu pathname={pathname} />
                </div>
            </div>
        </header>
    );
}

type UserMenuProps = {
    pathname: string;
};
function UserMenu({ pathname }: UserMenuProps) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <Skeleton className="size-8 rounded-full" />;
    }

    if (!session) {
        return (
            <>
                <Link
                    href={`/sign-in?callback_url=${encodeURIComponent(pathname)}`}
                    className={buttonVariants({
                        variant: 'ghost',
                        size: 'sm',
                    })}
                >
                    Sign In
                </Link>
                <Link
                    href="/sign-up"
                    className={cn(
                        buttonVariants({ size: 'sm' }),
                        'hidden sm:inline-flex',
                    )}
                >
                    Sign Up
                </Link>
            </>
        );
    }

    const { user } = session;
    const isCreator = hasRole(user, 'creator');
    const isAdmin = hasRole(user, 'admin');

    const initials =
        user.name
            .split(' ')
            .filter(Boolean)
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase() || '?';

    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in');
                    router.refresh();
                },
            },
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                aria-label="Open user menu"
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <Avatar>
                    <AvatarImage src={user.image ?? undefined} alt="" />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col gap-0.5">
                            <span className="truncate text-sm font-medium">
                                {user.name}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {isCreator && (
                        <DropdownMenuItem
                            onClick={() => router.push('/dashboard')}
                        >
                            <LayoutDashboardIcon />
                            Dashboard
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => router.push('/account')}>
                        <UserIcon />
                        Account
                    </DropdownMenuItem>
                    {isAdmin && (
                        <DropdownMenuItem onClick={() => router.push('/admin')}>
                            <ShieldIcon />
                            Admin
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void handleSignOut()}>
                    <LogOutIcon />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
