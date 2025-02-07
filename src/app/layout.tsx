import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import { AppProgressBarProvider, ReduxProvider, ThemeProvider } from '@/components/molecules';

import { Toaster } from '@/components/atoms/toaster';

export const metadata: Metadata = {
  title: {
    template: '%s | by Receh Koding',
    default: 'Receh Koding',
  },
  description: 'A web by Receh Koding',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html>
      <head>
        <link rel="icon" href="/images/logo.svg" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden font-inter">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <AppProgressBarProvider>
              {children}
              <Toaster />
            </AppProgressBarProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
