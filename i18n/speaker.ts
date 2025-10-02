export interface Speaker {
  id: string;
  name: string;
  avatarUrl: string;
  attendedIndex?: number;
  affiliation?: string;
  title?: string;
  sponsorId?: string;

  talkSchedule?: string;
  talkTrack?: "hacomono" | "mates" | "feature" | "cyberAgent";

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
