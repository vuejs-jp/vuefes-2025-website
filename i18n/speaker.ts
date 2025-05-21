export interface Speaker {
  name: string;
  avatarUrl: string;
  attended: boolean;
  affiliation?: string;

  socialUrls?: {
    x?: string;
    bluesky?: string;
    github?: string;
    mastodon?: string;
  };
}
