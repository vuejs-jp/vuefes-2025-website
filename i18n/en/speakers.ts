// ! api/ に移行するかも

import type { Speaker } from "../speaker";

const evan = {
  name: "Evan You",
  affiliation: "Creator of Vue.js & Vite",
  avatarUrl: "/images/avatars/evan-you.png",
  attendedIndex: 1,
  socialUrls: {
    github: "https://github.com/yyx990803",
    x: "https://x.com/youyuxi",
    bluesky: "https://bsky.app/profile/evanyou.me",
  },
};

export const SESSION_SPEAKERS: Speaker[] = [
  evan,
  {
    name: "Daniel Roe",
    affiliation: "Nuxt core team lead",
    avatarUrl: "/images/avatars/daniel-roe.png",
    attendedIndex: 4,
    socialUrls: {
      github: "https://github.com/danielroe",
      bluesky: "https://bsky.app/profile/danielroe.dev",
    },
  },
  {
    name: "Johnson Chu",
    affiliation: "Vue.js core team member, Volar.js author",
    avatarUrl: "/images/avatars/johnson-chu.png",
    attendedIndex: 5,
    socialUrls: {
      github: "https://github.com/johnsoncodehk",
      x: "https://x.com/johnsoncodehk",
    },
  },
  {
    name: "Guillaume Chau",
    affiliation: "Directus web architect",
    avatarUrl: "/images/avatars/guillaume-chau.png",
    attendedIndex: 6,
    socialUrls: {
      github: "https://github.com/Akryum",
      x: "https://x.com/Akryum",
      bluesky: "https://bsky.app/profile/guillaume.akryum.dev",
    },
  },
  {
    name: "Baku Hashimoto",
    avatarUrl: "/images/avatars/baku-hashimoto.png",
    attendedIndex: 7,
    socialUrls: {
      github: "https://github.com/baku89",
      x: "https://x.com/_baku89",
    },
  },
  {
    name: "Hiroshi Ogawa",
    affiliation: "VoidZero Inc.",
    title: "Vitest & Vite core team member",
    avatarUrl: "/images/avatars/hi-ogawa.png",
    attendedIndex: 8,
    socialUrls: {
      github: "https://github.com/hi-ogawa",
      bluesky: "https://bsky.app/profile/hiogawa.bsky.social",
      x: "https://twitter.com/hiroshi_18181",
    },
  },
  {
    name: "Yuji Sugiura",
    affiliation: "PixelGrid Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/yuji-sugiura.png",
    attendedIndex: 9,
    socialUrls: {
      github: "https://github.com/leaysgur",
      x: "https://x.com/leaysgur",
    },
  },
];

export const PANEL_DISCUSSION_SPEAKERS: Speaker[] = [
  evan,
  {
    name: "Dan Abramov",
    affiliation: "Previously: React, Bluesky",
    avatarUrl: "/images/avatars/dan_abramov.png",
    attendedIndex: 2,
    socialUrls: {
      github: "https://github.com/gaearon",
      bluesky: "https://bsky.app/profile/danabra.mov",
    },
  },
  {
    name: "dominikg",
    affiliation: "Svelte & Vite core team member",
    avatarUrl: "/images/avatars/dominikg.png",
    attendedIndex: 3,
    socialUrls: {
      github: "https://github.com/dominikg",
      bluesky: "https://bsky.app/profile/dominikg.dev",
      mastodon: "https://elk.zone/m.webtoo.ls/@dominikg",
    },
  },
  {
    name: "Kia King Ishii",
    affiliation: "Global Brain",
    title: "Vue.js Core Team Member",
    avatarUrl: "/images/avatars/kiaking.png",
    socialUrls: {
      github: "https://github.com/kiaking",
      x: "https://x.com/KiaKing85",
    },
  },
];
