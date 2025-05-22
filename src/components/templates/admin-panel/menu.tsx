'use client';

import { Ellipsis, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/atoms/button';
import { ScrollArea } from '@/components/atoms/scroll-area';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/atoms/tooltip';
import { getMenuList } from '@/lib/menu-list';
import { cn } from '@/lib/utils';
import { CollapseMenuButton } from './collapse-menu-button';
import DynamicIcon from '@/helper/dynamicIcons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect } from 'react';
import { fetchPermission } from '@/lib/slices/auth/permissionSlice';

interface MenuProps {
    isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
    const pathname = usePathname();
    const menuList = getMenuList(pathname);
    const dispatch = useAppDispatch();
    const { permission, loadingPermission, error } = useAppSelector((state) => state.permission);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    useEffect(() => {
        dispatch(fetchPermission());
    }, []);

    const toggleGroup = (groupLabel: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupLabel]: !prev[groupLabel]
        }));
    };

    // Check if permission is still loading or if there's an error
    if (loadingPermission) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading permissions</div>;
    }

    return (
        <ScrollArea className="[&>div>div[style]]:!block">
            <nav className="mt-3 h-full w-full">
                <ul className="flex min-h-[calc(90vh-58px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(90vh-42px-40px-32px)]">
                    {menuList.map(({ groupLabel, menus }, index) => {
                        // Filter menus that the user has permission to see
                        const filteredMenus = menus.filter(menu => {
                            // If no permissions are specified, show the menu
                            if (!menu.permission || menu.permission.length === 0) return true;

                            // Check if user has any of the required permissions
                            return menu.permission.some(requiredPerm =>
                                permission?.data?.permissions?.some(userPerm => userPerm.name === requiredPerm)
                            );
                        });

                        // Skip rendering this menu group if all its menus are filtered out
                        if (filteredMenus.length === 0) return null;

                        const isGroupExpanded = expandedGroups[groupLabel] ?? true;

                        return (
                            <li className={cn('w-full list-none', groupLabel ? 'pt-5' : '')} key={index}>
                                {/* Group Label - conditionally render based on isOpen state */}
                                {(isOpen && groupLabel) || isOpen === undefined ? (
                                    <div
                                        className="flex items-center justify-between px-4 pb-2 cursor-pointer"
                                        onClick={() => toggleGroup(groupLabel)}
                                    >
                                        <p className="max-w-[248px] truncate text-sm font-medium text-muted-foreground">
                                            {groupLabel}
                                        </p>
                                        {isGroupExpanded ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                    </div>
                                ) : !isOpen && isOpen !== undefined && groupLabel ? (
                                    <TooltipProvider>
                                        <Tooltip delayDuration={100}>
                                            <TooltipTrigger className="w-full">
                                                <div
                                                    className="flex w-full items-center justify-center cursor-pointer"
                                                    onClick={() => toggleGroup(groupLabel)}
                                                >
                                                    <Ellipsis className="h-5 w-5" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                                <p>{groupLabel}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ) : (
                                    <p className="pb-2"></p>
                                )}

                                {/* Render filtered menus only if group is expanded */}
                                {isGroupExpanded && filteredMenus.map(({ href, label, icon, active, submenus, permission }, menuIndex) => {
                                    // Filter submenus if they exist
                                    const filteredSubmenus = submenus ? submenus.filter(submenu => {
                                        if (!submenu.permission || submenu.permission.length === 0) return true;
                                        return submenu.permission.some(requiredPerm =>
                                            permission?.some(userPerm => userPerm === requiredPerm)
                                        );
                                    }) : [];

                                    // Render regular menu item if there are no submenus or all submenus are filtered out
                                    if (!submenus || submenus.length === 0 || filteredSubmenus.length === 0) {
                                        return (
                                            <div className="w-full" key={menuIndex}>
                                                <TooltipProvider disableHoverableContent>
                                                    <Tooltip delayDuration={100}>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant={(active === undefined && pathname.startsWith(href)) && pathname.endsWith(href) || active ? 'default' : 'ghost'}
                                                                className="mb-1 h-10 w-full justify-start"
                                                                asChild
                                                            >
                                                                <Link href={href}>
                                                                    <span className={cn(isOpen === false ? '' : 'mr-4')}>
                                                                        <DynamicIcon
                                                                        icon={icon}
                                                                        className={cn(
                                                                            active === undefined && pathname.startsWith(href) ? 'text-primary-foreground' : 'text-primary',
                                                                        )}
                                                                        />
                                                                    </span>
                                                                    <p
                                                                        className={cn(
                                                                            'max-w-[200px] truncate',
                                                                            isOpen === false ? '-translate-x-96 opacity-0' : 'translate-x-0 opacity-100',
                                                                        )}
                                                                    >
                                                                        {label}
                                                                    </p>
                                                                </Link>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        );
                                    }

                                    // Render collapsible menu with submenus
                                    return (
                                        <div className="w-full" key={menuIndex}>
                                            <CollapseMenuButton
                                                icon={icon}
                                                label={label}
                                                active={active === undefined ? pathname.startsWith(href) : active}
                                                submenus={filteredSubmenus}
                                                isOpen={isOpen}
                                            />
                                        </div>
                                    );
                                })}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </ScrollArea>
    );
}
