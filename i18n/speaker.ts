export interface Speaker {
  id: string;
  name: string;
  avatarUrl: string;
  attendedIndex?: number;
  affiliation?: string;
  title?: string;

  talkTitle?: string;
  talkOverview?: string;

  socialUrls?: {
    x?: string;
    bluesky?: string;
    github?: string;
    mastodon?: string;
  };

  // for og image
  color: "default" | "purple" | "orange" | "navy";
}
