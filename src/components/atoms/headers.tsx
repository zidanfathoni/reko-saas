"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../atoms";
import SettingMenu from "../molecules/settings/setting-menu";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Profile",
      link: "#profile",
    },
  ];

  return (
    <header className="flex items-center justify-between p-4 shadow-md">
      {/* Logo */}
      <a
        href="/"
        className="flex items-center gap-4"
      >
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

      {/* Menu for larger screens */}
      <nav
        className={`${isMenuOpen ? "block" : "hidden"
          } md:flex gap-6 absolute md:static top-16 left-0 w-full bg-white md:bg-transparent md:flex-row p-4 md:p-0 flex justify-center`}
      >
        {menu.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="text-sm font-medium hover:text-orange-500 transition-colors"
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Menu Toggle */}
        <div className="lg:hidden md:flex gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="text-sm font-medium hover:text-primary">
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {menu.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <Link href={item.link}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Login Button */}
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <SettingMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
