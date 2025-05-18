<script setup lang="ts">
import type { MenuItemProps } from "./MenuItem.vue";
import MenuItem from "./MenuItem.vue";
import { HOME_HEADING_ID } from "~/constant";

const NAV_ITEMS = [
  {
    label: "Home",
    href: `#${HOME_HEADING_ID.home}`,
  },
  __FEATURE_SPEAKERS__ && {
    label: "Speakers",
    href: `#${HOME_HEADING_ID.speakers}`,
  },
  __FEATURE_TICKET__ && {
    label: "Tickets",
    href: `#${HOME_HEADING_ID.tickets}`,
  },
  __FEATURE_CFP__ && {
    label: "CFP Wanted",
    href: `#${HOME_HEADING_ID.cfpWanted}`,
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
</script>

<template>
  <ul class="navigation-content" lang="en">
    <li v-for="(item, idx) in NAV_ITEMS" :key="idx">
      <MenuItem :label="item.label" :href="item.href" />
    </li>
  </ul>
</template>

<style scoped>
.navigation-content {
  width: auto;
  max-width: 15rem;
  background: var(--color-white);
  border-radius: 20px;
  padding: 0.5rem 0.1rem;
  margin: 0;
}

.navigation-content li {
  list-style: none;
  padding: 0.5rem 2rem;
}
</style>
