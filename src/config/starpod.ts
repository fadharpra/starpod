import type { StarpodConfig } from '../types/starpod-config';

export const starpodConfig: StarpodConfig = {
  rssFeed: 'https://whiskey.fm/feed.xml',
  description: 'A podcast about web dev, tools, and craft.',
  blurb: 'Discussing development & design with great humans.',
  hosts: [
    {
      name: 'Fadhli Ari',
      img: 'portrait.jpg'
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
