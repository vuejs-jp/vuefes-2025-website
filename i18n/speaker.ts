export interface Speaker {
  name: string;
  avatarUrl: string;
  attended: boolean;
  affiliation?: string;
  title?: string;

  socialUrls?: {
    x?: string;
    bluesky?: string;
    github?: string;
    mastodon?: string;
  };
}
