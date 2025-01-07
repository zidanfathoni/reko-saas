import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Develop by{" "}
          <Link
            href="https://zidanfath.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Zidanfath
          </Link>
          . © 2024 {" "}
          <Link
            href="https://recehkoding.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Receh Koding
          </Link>
          . All rights reserved.
        </p>
      </div>
    </div>
  );
}
