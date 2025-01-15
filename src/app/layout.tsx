import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProgressBarProvider, ReduxProvider, ThemeProvider } from '@/components/molecules';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from '@/components/atoms/toaster';

// fonts
const interFont = Inter({ subsets: ['latin'], variable: '--font-inter' });
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
  const locale = await getLocale();
  const langs = await getMessages();

  return (
    <html lang={locale} className={interFont.variable}>
      <head>
        <link rel="icon" href="/images/logo.svg" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden font-inter">
        <NextIntlClientProvider messages={langs}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
