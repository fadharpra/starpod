export interface StarpodConfig {
  platforms: {
    appleIdNumber: string;
    apple?: string;
    spotify?: string;
    overcast?: string;
    youtube?: string;
  };
  rssFeed: string;
  blurb: string;
  description: string;
  hosts: Array<{
    name: string;
    img: string;
    title: string;
    bio?: string;
    twitter?: string;
    github?: string;
    website?: string;
  }>;
}

