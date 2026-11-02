import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { OrgSwitcher } from './sidebar/org-switcher';
import { ComponentProps } from 'react';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { SidebarUser } from './sidebar/sidebar-user';
import { User } from '@/auth/config';
import { SidebarMainNav } from './sidebar/sidebar-nav';
import { SquareTerminalIcon } from 'lucide-react';

const DASHBOARD_NAV_ITEMS = [
    {
        title: 'Playground',
        url: '#',
        icon: SquareTerminalIcon,
        isActive: true,
        items: [
            {
                title: 'History',
                url: '#',
            },
            {
                title: 'Starred',
                url: '#',
            },
            {
                title: 'Settings',
                url: '#',
            },
        ],
    },
];

type DashboardSidebarProps = ComponentProps<typeof Sidebar> & {
    user: User;
    activeOrgId: string;
};

export async function DashboardSidebar({
    activeOrgId,
    user,
    ...props
}: DashboardSidebarProps) {
    const orgs = await auth.api.listOrganizations({
        headers: await headers(),
    });

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <OrgSwitcher orgs={orgs} activeOrgId={activeOrgId} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMainNav items={DASHBOARD_NAV_ITEMS} />
            </SidebarContent>
            <SidebarFooter>
                <SidebarUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
