import {
    FolderIcon,
    GaugeIcon,
    HomeIcon,
    LayoutDashboardIcon,
    LinkIcon,
    ScrollTextIcon,
    SettingsIcon,
    ShieldCheckIcon,
    ShoppingCartIcon,
    UserIcon,
    UsersIcon,
    type LucideIcon,
} from 'lucide-react';
import { hasRole } from './roles';

export type NavItem = {
    label: string;
    href: string;
    icon?: LucideIcon;
    exact?: boolean;
    role?: string;
};

export const MAIN_NAV: NavItem[] = [
    {
        label: 'Home',
        href: '/',
        icon: HomeIcon,
        exact: true,
    },
    {
        label: 'Products',
        href: '/products',
        icon: ShoppingCartIcon,
    },
];

export const SUB_NAVS = {
    account: {
        label: 'Account',
        items: [
            { label: 'Profile', href: '/account', icon: UserIcon, exact: true },
            {
                label: 'Security',
                href: '/account/security',
                icon: ShieldCheckIcon,
            },
            {
                label: 'Connections',
                href: '/account/connections',
                icon: LinkIcon,
            },
        ],
    },
    dashboard: {
        label: 'Dashboard',
        items: [
            {
                label: 'Overview',
                href: '/dashboard',
                icon: LayoutDashboardIcon,
                exact: true,
            },
            {
                label: 'Projects',
                href: '/dashboard/projects',
                icon: FolderIcon,
            },
            {
                label: 'Settings',
                href: '/dashboard/settings',
                icon: SettingsIcon,
            },
        ],
    },
    admin: {
        label: 'Admin',
        items: [
            { label: 'Overview', href: '/admin', icon: GaugeIcon, exact: true },
            { label: 'Users', href: '/admin/users', icon: UsersIcon },
            { label: 'Audit Log', href: '/admin/audit', icon: ScrollTextIcon },
        ],
    },
} satisfies Record<string, { label: string; items: NavItem[] }>;

export type SubNavKey = keyof typeof SUB_NAVS;

export function isActive(
    pathname: string,
    item: Pick<NavItem, 'href' | 'exact'>,
) {
    if (item.exact) return pathname === item.href;

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function filterNav<T extends Pick<NavItem, 'role'>>(
    items: T[],
    user: { role?: string | null } | null | undefined,
): T[] {
    return items.filter((item) => !item.role || hasRole(user, item.role));
}
