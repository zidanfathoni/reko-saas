'use client';

import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

import { Button } from '@/components/atoms/button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className="mr-2 rounded-full bg-background hover:bg-primary"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <FaSun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100" />
      <FaMoon className="scale-1000 absolute h-[1.2rem] w-[1.2rem] rotate-0 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />
      <span className="sr-only">Switch Theme</span>
    </Button>
  );
}
