// ! api/ に移行するかも

import type { Speaker } from "../speaker";

export const SESSION_SPEAKERS: Speaker[] = [
  {
    name: "Evan You",
    affiliation: "Creator of Vue.js & Vite",
    avatarUrl: "/images/avatars/evan-you.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/yyx990803",
      x: "https://x.com/youyuxi",
      bluesky: "https://bsky.app/profile/evanyou.me",
    },
  },
  {
    name: "Daniel Roe",
    affiliation: "Nuxt core team lead",
    avatarUrl: "/images/avatars/daniel-roe.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/danielroe",
      bluesky: "https://bsky.app/profile/danielroe.dev",
    },
  },
  {
    name: "Johnson Chu",
    affiliation: "Vue.js core team member, Volar.js author",
    avatarUrl: "/images/avatars/johnson-chu.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/johnsoncodehk",
      x: "https://x.com/johnsoncodehk",
    },
  },
  {
    name: "Guillaume Chau",
    affiliation: "Directus web architect",
    avatarUrl: "/images/avatars/guillaume-chau.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/Akryum",
      x: "https://x.com/Akryum",
      bluesky: "https://bsky.app/profile/akryum.dev",
    },
  },
  {
    name: "Baku Hashimoto",
    avatarUrl: "/images/avatars/baku-hashimoto.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/baku89",
      x: "https://x.com/_baku89",
    },
  },
  {
    name: "Hiroshi Ogawa",
    affiliation: "VoidZero Inc.",
    title: "Vitest & Vite team member",
    avatarUrl: "/images/avatars/hi-ogawa.png",
    attended: true,
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
    attended: true,
    socialUrls: {
      github: "https://github.com/leaysgur",
      x: "https://x.com/leaysgur",
    },
  },
];

// NOTE: tmp naming
export const EVENT_SPEAKERS: Speaker[] = [
  {
    name: "Evan You",
    affiliation: "Creator of Vue.js & Vite",
    avatarUrl: "/images/avatars/evan-you.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/yyx990803",
      x: "https://x.com/youyuxi",
      bluesky: "https://bsky.app/profile/evanyou.me",
    },
  },
  {
    name: "dominikg",
    affiliation: "Svelte & Vite core team member",
    avatarUrl: "/images/avatars/dominikg.png",
    attended: false,
    socialUrls: {
      github: "https://github.com/dominikg",
      mastodon: "https://elk.zone/m.webtoo.ls/@dominikg",
    },
  },
];
