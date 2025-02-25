"use client"

import { ModeToggle } from '@/components/mode-toggle';
import { SheetMenu } from './sheet-menu';
import { UserNav } from './user-nav';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/atoms/breadcrumb'
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const checkAuth = useSidebar((state) => state.checkAuth);
  const [enableUserNav, setEnableUserNav] = useState(false);

  useEffect(() => {
    checkAuth();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || !role) {
      setEnableUserNav(false);
    } else if (role !== 'user') {
      setEnableUserNav(true);
    } else {
      setEnableUserNav(false);
    }
  }, [checkAuth]);
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          {/* <h1 className="text-lg font-bold">{title}</h1> */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={enableUserNav ? '/admin' : '#'}
                    passHref
                  >
                    <Image
                      src="/images/logo/recehkoding-logo-square.svg"
                      alt="Next.js logo"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          {
            enableUserNav && <UserNav />
          }
        </div>
      </div>
    </header>
  );
}
