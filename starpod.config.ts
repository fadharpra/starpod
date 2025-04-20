import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import type { StarpodConfig } from './src/types/starpod-config';

const starpodConfig: StarpodConfig = {
  platforms: {
    appleIdNumber: '123456789',
    apple: 'https://podcasts.apple.com/podcast/your-podcast',
    spotify: 'https://open.spotify.com/show/your-podcast',
    overcast: 'https://overcast.fm/itunes123456789/your-podcast',
    youtube: 'https://www.youtube.com/channel/your-channel',
  },
  rssFeed: 'https://yourdomain.com/rss.xml',
  blurb: 'Your podcast blurb here.',
  description: 'Your podcast description here.',
  hosts: [
    {
      name: 'Host Name',
      img: '/path/to/image.jpg',
      title: 'Host Title',
      bio: 'Short bio of the host.',
      twitter: 'https://twitter.com/host',
      github: 'https://github.com/host',
      website: 'https://hostwebsite.com',
    },
    // Tambahkan host lain jika diperlukan
  ],
};

export default defineConfig({
  output: 'static',
  adapter: vercel({
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
  }),
  site: 'https://yourdomain.com',
  integrations: [db(), preact(), sitemap()],
  redirects: {
    '/old-route': '/new-route',
    // Tambahkan redirect lain jika diperlukan
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

export { starpodConfig };
