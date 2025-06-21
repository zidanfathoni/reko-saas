import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/config/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  crossOrigin: 'anonymous',
  images: {
    domains: [
      'assets.aceternity.com',
      'i.imgur.com',
      'zidanfath.com',
      'localhost',
      'example.com'

    ],
  },
}

export default withNextIntl(nextConfig);
