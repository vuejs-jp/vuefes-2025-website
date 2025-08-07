export type NameBadgeInput =
  ({
    role: "Attendee" | "Attendee+Party" | "Speaker" | "Sponsor";
  } | {
    role: "Staff";
    lang: "jp" | "en";
  }) & {
    name: string;

    /** auto generated value as default */
    userId?: string;

    /** auto generated value as default */
    email?: string;
  } & (
    | {
      /**
         * @default "create"
         *
         * when update and delete, target searched by name and role
         */
      action?: "create";
      localAvatarImagePath: string;
    }
    | {
      action: "update" | "delete";
      localAvatarImagePath?: string;
    }
  );
