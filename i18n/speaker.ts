export interface Speaker {
  name: string;
  avatarUrl: string;
  attendedIndex?: number;
  affiliation?: string;
  title?: string;
  talkOverview?: string;

  socialUrls?: {
    x?: string;
    bluesky?: string;
    github?: string;
    mastodon?: string;
  };
}
