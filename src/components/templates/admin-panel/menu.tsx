'use client';

import { Ellipsis, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-3 h-full w-full">
        <ul className="flex min-h-[calc(90vh-58px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(90vh-42px-40px-32px)]">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="flex w-full items-center justify-center">
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
              {menus.map(({ href, label, icon, active, submenus }, index) =>
                !submenus || submenus.length === 0 ? (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={
                              (active === undefined && pathname.startsWith(href)) && pathname.endsWith(href) || active
                                ? 'secondary'
                                : 'ghost'
                            }
                            className="mb-1 h-10 w-full justify-start"
                            asChild
                          >
                            <Link href={href}>
                              <span className={cn(isOpen === false ? '' : 'mr-4')}>
                                {/* <Icon size={18} /> */}
                                <DynamicIcon
                                  icon={icon}
                                />
                              </span>
                              <p
                                className={cn(
                                  'max-w-[200px] truncate',
                                  isOpen === false
                                    ? '-translate-x-96 opacity-0'
                                    : 'translate-x-0 opacity-100',
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
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={icon}
                      label={label}
                      active={active === undefined ? pathname.startsWith(href) : active}
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                ),
              )}
            </li>
          ))}
          <li className="flex w-full grow items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => { }}
                    variant="outline"
                    className="mt-5 h-10 w-full justify-center"
                  >
                    <span className={cn(isOpen === false ? '' : 'mr-4')}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        'whitespace-nowrap',
                        isOpen === false ? 'hidden opacity-0' : 'opacity-100',
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
