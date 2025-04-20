export interface StarpodConfig {
  rssFeed: string;
  description: string;
  blurb: string;
  hosts: Array<{
    name: string;
    img: string;
    title: string;
    bio?: string;
    twitter?: string;
    github?: string;
    website?: string;
  }>;
  platforms: {
    appleIdNumber: string;
    apple?: string;
    spotify?: string;
    overcast?: string;
    youtube?: string;
  };
}
