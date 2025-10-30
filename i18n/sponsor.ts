import type { Speaker } from "./speaker";

export interface Sponsor {
  id: string;
  name: string;
  logoImageUrl: string;
  logoImageAlt: string;
  linkUrl: string;
  plan: "platina" | "gold" | "silver" | "bronze" | "creative" | "option-only";
  option?: Option[];
  description?: string;
  session?: {
    title: string;
    overview: string;
    speaker: Speaker;
  }[];
}

export type Option
  = | "hall-naming-rights"
    | "room-naming-rights"
    | "hands-on"
    | "live-translation"
    | "name-badge"
    | "after-party"
    | "student-support"
    | "staff-t-shirts"
    | "exhibition"
    | "intermission-slide"
    | "job-board";

export interface OptionSponsor {
  title: string;
  data: Sponsor[];
}
