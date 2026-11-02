'use client';

import { Organization } from '@/auth/config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { ChevronsUpDown, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

type OrgSwitcherProps = {
    orgs: Organization[];
    activeOrgId: string | null;
};

export function OrgSwitcher({ orgs, activeOrgId }: OrgSwitcherProps) {
    const { isMobile } = useSidebar();
    const active = useMemo(() => {
        return orgs.find((o) => o.id === activeOrgId);
    }, [orgs, activeOrgId]);

    function onOrgClick(id: string) {}

    if (!activeOrgId || !active) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            />
                        }
                    >
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <Avatar>
                                {active.logo && (
                                    <AvatarImage
                                        src={active?.logo}
                                        alt={active.name}
                                    />
                                )}
                                <AvatarFallback>
                                    {active.name.substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {active.name}
                            </span>
                            <span className="truncate text-xs">
                                {active.slug}
                            </span>
                        </div>
                        <ChevronsUpDown className="ml-auto" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                                Organizations
                            </DropdownMenuLabel>
                            {orgs.map((org, index) => (
                                <DropdownMenuItem
                                    key={org.id}
                                    onClick={() => onOrgClick(org.id)}
                                    className="gap-2 p-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <Avatar>
                                            {active.logo && (
                                                <AvatarImage
                                                    src={active?.logo}
                                                    alt={active.name}
                                                />
                                            )}
                                            <AvatarFallback>
                                                {active.name.substring(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    {org.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="gap-2 p-2"
                            render={
                                <Link
                                    href={'/creators/organizations/onboarding'}
                                />
                            }
                        >
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <PlusIcon className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">
                                Add organization
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
