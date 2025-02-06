'use client';


import { Menu, MoveRight, X } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Button
} from '.';
import { ModeToggle } from "../mode-toggle";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './navigation-menu';

const Navbar: React.FC = () => {

  const [isOpen, setOpen] = useState(false);
  const navigationItems = [
    {
      title: "Home",
      href: "/#home",
      description: "",
    },
    {
      title: "Study",
      description: "Study is the process of learning and understanding.",
      items: [
        {
          title: "Blogs",
          href: "https://blog.recehkoding.com",
          target: '_blank',
        },
        {
          title: "Tutorials",
          href: "/tutorials",
          target: '_self',
        },
        {
          title: "Events",
          href: "/events",
          target: '_self',
        },
        {
          title: "Stucks",
          href: "/stucks",
          target: '_self',
        },
        {
          title: "Tools",
          href: "/tools",
          target: '_self',
        },
      ],
    },
    {
      title: "Community",
      description: "We are a team of creatives who are excited about unique ideas and help digital and fin-tech companies.",
      items: [
        {
          title: "About us",
          href: "/about",
          target: '_self',
        },
        {
          title: "Services",
          href: "/services",
          target: '_self',
        },
        {
          title: "Showcase",
          href: "/showcase",
          target: '_self',
        },
        {
          title: "Testimonials",
          href: "/testimonials",
          target: '_self',
        },
        {
          title: "Contact us",
          href: "/contact",
          target: '_self',
        },
        {
          title: "Founder",
          href: "https://zidanfath.com/",
          target: '_blank',
        },
      ],
    },
  ];

  return (
    <header className="flex w-full z-40 fixed top-0 left-0 bg-background">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink
                        href={item.href}
                        key={item.title}
                      >
                        <Button variant="ghost" className="hover:bg-primary hover:text-primary-foreground">{item.title}</Button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                            <Button
                              onClick={() => (window.location.href = '/subscriptions')}
                              size="sm" className="mt-10 bg-primary">
                              FAQs
                            </Button>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-start">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                target={subItem.target}
                                key={subItem.title}
                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">
          <a href="/" className="flex items-center gap-4">
            <div className="flex items-center">
              <Image
                src="/images/logo/recehkoding-logo.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
              />
            </div>
          </a>
        </div>
        <div className="flex justify-end w-full gap-4">
          <div className="border-r hidden md:inline"></div>
          <Button
            onClick={() => (window.location.href = '/auth')}
            variant="outline">
            Sign in
          </Button>
          <ModeToggle />
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center"
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
