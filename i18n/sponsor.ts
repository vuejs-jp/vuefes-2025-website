import type { Speaker } from "./speaker";

export interface Sponsor {
  id: string;
  name: string;
  logoImageUrl: string;
  logoImageAlt: string;
  linkUrl: string;
  plan: "platina" | "gold" | "silver" | "bronze";
  description?: string;

  session?: {
    title: string;
    overview: string;
    speaker: Speaker;
  }[];
}
