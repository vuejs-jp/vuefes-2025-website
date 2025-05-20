import type { MenuItemProps } from "./VFMenuItem.vue";
import { HOME_HEADING_ID } from "~/constant";

export const NAV_ITEMS = [
  {
    label: "Home",
    href: `#${HOME_HEADING_ID.home}`,
  },
  __FEATURE_CFP__ && {
    label: "CFP Wanted",
    href: `#${HOME_HEADING_ID.cfpWanted}`,
  },
  {
    label: "Speakers",
    href: `#${HOME_HEADING_ID.speakers}`,
  },
  __FEATURE_TICKET__ && {
    label: "Tickets",
    href: `#${HOME_HEADING_ID.tickets}`,
  },
  {
    label: "Message",
    href: `#${HOME_HEADING_ID.message}`,
  },
  __FEATURE_SPONSOR_LIST__ && {
    label: "Sponsors",
    href: `#${HOME_HEADING_ID.sponsors}`,
  },
  {
    label: "Sponsor Wanted",
    href: `#${HOME_HEADING_ID.sponsorWanted}`,
  },
  {
    label: "Contact",
    href: `#${HOME_HEADING_ID.contact}`,
  },
].filter(it => !!it) satisfies MenuItemProps[];
