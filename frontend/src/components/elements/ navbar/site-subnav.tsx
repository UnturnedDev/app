'use client';

import { isActive, SUB_NAVS, SubNavKey } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '../container';

type SiteSubNavProps = {
    section: SubNavKey;
};

export function SiteSubNav({ section }: SiteSubNavProps) {
    const pathname = usePathname();
    const { items, label } = SUB_NAVS[section];

    return (
        <div className="sticky top-14 z-30 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
            <Container>
                <nav
                    aria-label={label}
                    className="-mx-3 flex h-12 items-stretch gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {items.map((item) => {
                        const active = isActive(pathname, item);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    // layout
                                    'relative isolate inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-3 text-sm font-medium transition-colors',
                                    // hover pill, sits behind the content
                                    'before:absolute before:inset-x-0 before:inset-y-1.5 before:-z-10 before:rounded-md before:transition-colors',
                                    // active underline, anchored to the bottom of the bar
                                    'after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors',
                                    active
                                        ? 'text-foreground after:bg-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:before:bg-accent/60',
                                )}
                            >
                                {Icon && (
                                    <Icon
                                        aria-hidden
                                        className={cn(
                                            'size-4 shrink-0 transition-colors',
                                            active && 'text-primary',
                                        )}
                                    />
                                )}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </Container>
        </div>
    );
}
