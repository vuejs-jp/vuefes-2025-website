// ! api/ に移行するかも

import type { Speaker } from "../speaker";

export const SESSION_SPEAKERS: Speaker[] = [
  {
    name: "Evan You",
    title: "Vue.js、Vite クリエーター",

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
    title: "Nuxt コアチームリード",
    avatarUrl: "/images/avatars/daniel-roe.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/danielroe",
      bluesky: "https://bsky.app/profile/danielroe.dev",
    },
  },
  {
    name: "Johnson Chu",
    title: "Vue.js コアチームメンバー、Volar.js 作者",
    avatarUrl: "/images/avatars/johnson-chu.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/johnsoncodehk",
      x: "https://x.com/johnsoncodehk",
    },
  },
  {
    name: "Guillaume Chau",
    title: "Directus Web アーキテクト",
    avatarUrl: "/images/avatars/guillaume-chau.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/Akryum",
      x: "https://x.com/Akryum",
      bluesky: "https://bsky.app/profile/guillaume.akryum.dev",
    },
  },
  {
    name: "橋本 麦",
    avatarUrl: "/images/avatars/baku-hashimoto.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/baku89",
      x: "https://x.com/_baku89",
    },
  },
  {
    name: "小川 浩志",
    affiliation: "VoidZero Inc.",
    title: "Vitest、Vite コアチームメンバー",
    avatarUrl: "/images/avatars/hi-ogawa.png",
    attended: true,
    socialUrls: {
      github: "https://github.com/hi-ogawa",
      bluesky: "https://bsky.app/profile/hiogawa.bsky.social",
      x: "https://twitter.com/hiroshi_18181",
    },
  },
  {
    name: "杉浦 有右嗣",
    affiliation: "ピクセルグリッド",
    title: "フロントエンドエンジニア",
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
    title: "Vue.js、Vite 作者",
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
    title: " Svelte & Vite コアチームメンバー",
    avatarUrl: "/images/avatars/dominikg.png",
    attended: false,
    socialUrls: {
      github: "https://github.com/dominikg",
      mastodon: "https://elk.zone/m.webtoo.ls/@dominikg",
    },
  },
];
