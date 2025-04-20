// starpod.config.ts
import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import type { StarpodConfig } from './src/types/starpod-config';

// ✅ Konfigurasi metadata konten
export const starpodConfig: StarpodConfig = {
  rssFeed: 'https://whiskey.fm/feed.xml',
  description: 'A podcast about web dev, tools, and craft.',
  blurb: 'Discussing development & design with great humans.',
  hosts: [
    {
      name: 'Fadhli Ari',
      img: 'https://dummyimage.com/200x200',
      title: 'Infra Engineer',
      bio: 'Infra and Linux stuff.',
      github: 'https://github.com/fadharpra',
      twitter: 'https://twitter.com/fadharpra',
      website: 'https://fadharpra.id',
    },
  ],
  platforms: {
    appleIdNumber: '1234567890',
    apple: 'https://podcasts.apple.com/',
    spotify: 'https://open.spotify.com/',
    overcast: 'https://overcast.fm/',
    youtube: 'https://youtube.com/@fadharpra',
  },
};

// ✅ Konfigurasi Astro (tetap sebagai default export)
export default defineConfig({
  output: 'static',
  site: 'https://whiskey.fm',
  adapter: vercel({
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [db(), preact(), sitemap()],
  redirects: {
    '/hot-takes-tan-stack-and-open-source-with-tanner-linsley':
      '/hot-takes-tanstack-and-open-source-with-tanner-linsley',
    '/creating-code-pen-tackling-tailwind-and-keeping-it-simple-with-chris-coyier':
      '/creating-codepen-tackling-tailwind-and-keeping-it-simple-with-chris-coyier',
    '/coding-languages-ai-and-the-evolution-of-game-development-with-phillip-winston':
      '/coding-languages-ai-and-the-evolution-of-game-development-with-philip-winston',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
