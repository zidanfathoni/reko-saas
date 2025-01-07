import { Icon } from '@/components/atoms';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ThemeMenu } from './theme-switcher';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const SettingMenu = React.forwardRef<HTMLButtonElement, Props>(({ className, ...props }, ref) => {
  const t = useTranslations('Common');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={'icon'} className={className} ref={ref} {...props}>
          <Icon name="Palette" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSub>
          <ThemeMenu />
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <ThemeMenu />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

SettingMenu.displayName = 'SettingMenu';

export default SettingMenu;
