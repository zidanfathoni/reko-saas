import { MenuIcon, PanelsTopLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/atoms/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/atoms/sheet';
import { Menu } from './menu';
import Image from 'next/image';

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col px-1 sm:w-62" side="left">
        <SheetHeader>
          <Button className="flex items-center justify-center pb-2 pt-1" variant="link" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              {/* <PanelsTopLeft className="mr-1 h-6 w-6" /> */}
              {/* <SheetTitle className="text-lg font-bold">Receh Koding</SheetTitle> */}
              <Image
                src="/images/logo/recehkoding-logo.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
              />
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
