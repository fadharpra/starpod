import { htmlToText } from 'html-to-text';
import parseFeed from 'rss-to-json';
import { array, number, object, optional, parse, string } from 'valibot';

import { dasherize } from '../utils/dasherize';
import { truncate } from '../utils/truncate';
import { starpodConfig } from '../config/starpod';

export interface Show {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Episode {
  id: string;
  title: string;
  published: number;
  description: string;
  content: string;
  episodeImage?: string;
  episodeNumber?: string;
  episodeSlug: string;
  audio: {
    src: string;
    type: string;
  };
}

export async function getShowInfo(): Promise<Show> {
  try {
    // @ts-expect-error
    return (await parseFeed.parse(starpodConfig.rssFeed)) as Show;
  } catch (err) {
    console.warn('⚠️ Failed to fetch or parse RSS feed in getShowInfo, using dummy show.');
    return {
      title: 'DevInfra Cast',
      description: 'A tech podcast for cloud-native engineers and DevOps enthusiasts.',
      image: '/favicon.svg',
      link: 'https://yourdomain.com'
    };
  }
}

export async function getAllEpisodes(): Promise<Episode[]> {
  const FeedSchema = object({
    items: array(
      object({
        id: string(),
        title: string(),
        published: number(),
        description: string(),
        itunes_episode: optional(number()),
        itunes_episodeType: string(),
        itunes_image: optional(object({ href: optional(string()) })),
        enclosures: array(
          object({
            url: string(),
            type: string()
          })
        )
      })
    )
  });

  try {
    // @ts-expect-error
    const feed = (await parseFeed.parse(starpodConfig.rssFeed)) as Show;
    const items = parse(FeedSchema, feed).items;

    const episodes: Array<Episode> = items
      .filter((item) => item.itunes_episodeType !== 'trailer')
      .map(
        ({
          description,
          id,
          title,
          enclosures,
          published,
          itunes_episode,
          itunes_episodeType,
          itunes_image
        }) => {
          const episodeNumber =
            itunes_episodeType === 'bonus' ? 'Bonus' : `${itunes_episode}`;
          const episodeSlug = dasherize(title);

          return {
            id,
            title: `${title}`,
            content: description,
            description: truncate(htmlToText(description), 260),
            episodeImage: itunes_image?.href?.replace('3000x3000', '200x200'),
            episodeNumber,
            episodeSlug,
            published,
            audio: enclosures.map((enclosure) => ({
              src: enclosure.url,
              type: enclosure.type
            }))[0]
          };
        }
      );

    return episodes;
  } catch (err) {
    console.error('⚠️ Failed to fetch or parse RSS feed, fallback to dummy episodes.', err);

    return [
      {
        id: 'dummy-ep-1',
        title: 'The Power of DevInfra Automation',
        content: 'In this episode, we explore IaC and automation in cloud-native stacks.',
        description: 'We explore IaC and automation in cloud-native stacks.',
        published: Date.now(),
        episodeNumber: '1',
        episodeSlug: 'the-power-of-devinfra-automation',
        audio: {
          src: 'https://example.com/audio/devinfra.mp3',
          type: 'audio/mpeg'
        }
      },
      {
        id: 'dummy-ep-2',
        title: 'Coffee and CI/CD Pipelines ☕',
        content: 'Caffeine-fueled deployments and the rise of GitHub Actions.',
        description: 'Caffeine-fueled deployments and the rise of GitHub Actions.',
        published: Date.now() - 86400000,
        episodeNumber: '2',
        episodeSlug: 'coffee-and-ci-cd-pipelines',
        audio: {
          src: 'https://example.com/audio/cicd.mp3',
          type: 'audio/mpeg'
        }
      }
    ];
  }
}
