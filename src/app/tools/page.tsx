import ToolsModules from '@/components/modules/tools';
import { MainLayout } from '@/components/templates';
import SchemaMarkup from '@/config/schemaMarkup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Tools by Receh Koding',
    default: 'Tools | Receh Koding',
  },
  authors: [
    { name: process.env.NEXT_PUBLIC_AUTHOR, url: process.env.NEXT_PUBLIC_AUTHOR_URL },
  ],
  keywords: [
    "Receh Koding",
    "professional tools",
    "software development tools",
    "custom IT tools",
    "collaborative tools",
    "project tools",
  ],
  publisher: process.env.NEXT_PUBLIC_PUBLISHER,
  robots: 'index, follow',
  twitter: {
    site: process.env.NEXT_PUBLIC_TWITTER_SITE,
    creator: process.env.NEXT_PUBLIC_PUBLISHER,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PUBLIC_URL}/tools`,
  },
  applicationName: process.env.NEXT_PUBLIC_APP_NAME,
  creator: 'Receh Koding',
  generator: 'Receh Koding',
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}/tools`,
    title: 'Tools by Receh Koding',
    description: 'Explore a wide range of professional tools offered by Receh Koding, tailored to meet your software development and IT needs.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}/images/tools-banner.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tools by Receh Koding',
      },
    ],
    emails: process.env.NEXT_PUBLIC_EMAIL,
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    type: 'website',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  category: 'Tools',
  abstract: 'Professional tools offered by Receh Koding',
}


export default function ToolsPages() {

  return (
    <MainLayout>
      <ToolsModules />
    </MainLayout>
  );
}
