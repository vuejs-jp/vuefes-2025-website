export type NameBadgeInput =
  ({
    role: "Attendee" | "Attendee+Party" | "Speaker" | "Sponsor";
  } | {
    role: "Staff";
    lang: "jp" | "en";
  }) & {
    name: string;

    localAvatarImagePath: string;

    /** auto generated value as default */
    userId?: string;

    /** auto generated value as default */
    email?: string;
  };
