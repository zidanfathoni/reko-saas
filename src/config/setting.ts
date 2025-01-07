export const Setting = {
  name: 'reko-saas-boilerplate',
  displayName: 'Next TS Shadcn Boilerplate',
  //   site: 'https://chocoding.vercel.app/',

  versioning: {
    ver: '1.0',
    date: '31-May-2024',
  },

  defaultLanguage: 'id',
  languageSupport: ['en', 'id'] as const,
  defaultTheme: 'system',
  themeSupport: ['light', 'dark', 'system'] as const,

  numberPrecision: 2,
  moneyPrecision: 0,
  defaultIconSize: 16,

  progressBarColor: '#FF7700FF',
  progressBarThickness: '4px',

  author: {
    name: 'Receh Koding',
    displayName: 'Zidanfath',
    github: 'https://github.com/zidhaanfa',
    insta: 'https://www.instagram.com/recehkoding',
    logo: {
      default: 'logo.svg',
      onLight: 'logo-colored.svg',
      onDark: 'logo-white.svg',
    },
  },
};
