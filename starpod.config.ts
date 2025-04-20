// starpod.config.ts
export default {
  rssFeed: 'https://whiskey.fm/feed.xml',
  description: 'A podcast about web dev, tools, and craft.',
  blurb: 'Discussing development & design with great humans.',

  hosts: [
    {
      name: 'Fadhli Ari',
      img: 'https://dummyimage.com/200x200',
      title: 'Infra Engineer',
      bio: 'A curious Linux & GCP enthusiast who loves automation.',
      github: 'https://github.com/fadharpra',
      twitter: 'https://twitter.com/fadharpra',
      website: 'https://fadharpra.id'
    },
    {
      name: 'Guest Host',
      img: 'https://dummyimage.com/200x200',
      title: 'Cloud Specialist',
      bio: 'Passionate about cloud-native tech and dev advocacy.',
      github: 'https://github.com/guesthost',
      twitter: 'https://twitter.com/guesthost',
      website: 'https://guesthost.dev'
    }
  ],

  platforms: {
    appleIdNumber: '1234567890',
    apple: 'https://podcasts.apple.com/podcast/example',
    spotify: 'https://open.spotify.com/show/example',
    overcast: 'https://overcast.fm/example',
    youtube: 'https://www.youtube.com/@example'
  }
};
