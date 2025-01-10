import Link from 'next/link';

export function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 flex h-14 items-center md:mx-8">
        <p className="text-left text-xs leading-loose text-muted-foreground md:text-sm">
          Develop by{' '}
          <Link
            href="https://zidanfath.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Zidanfath
          </Link>
          . © {date}{' '}
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
