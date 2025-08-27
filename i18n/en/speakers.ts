// ! api/ に移行するかも

import type { Speaker } from "../speaker";

const evan = {
  id: "yyx990803",
  name: "Evan You",
  affiliation: "Creator of Vue.js & Vite",
  avatarUrl: "/images/avatars/evan-you.png",
  attendedIndex: 1,
  color: "default" as const,
  socialUrls: {
    github: "https://github.com/yyx990803",
    x: "https://x.com/youyuxi",
    bluesky: "https://bsky.app/profile/evanyou.me",
  },
};

export const SESSION_SPEAKERS: Speaker[] = [
  evan,
  {
    id: "danielroe",
    name: "Daniel Roe",
    affiliation: "Nuxt core team lead",
    avatarUrl: "/images/avatars/daniel-roe.png",
    attendedIndex: 4,
    color: "purple",
    socialUrls: {
      github: "https://github.com/danielroe",
      bluesky: "https://bsky.app/profile/danielroe.dev",
    },
  },
  {
    id: "johnsoncodehk",
    name: "Johnson Chu",
    affiliation: "Vue.js core team member, Volar.js author",
    avatarUrl: "/images/avatars/johnson-chu.png",
    attendedIndex: 5,
    color: "orange",
    socialUrls: {
      github: "https://github.com/johnsoncodehk",
      x: "https://x.com/johnsoncodehk",
    },
  },
  {
    id: "akryum",
    name: "Guillaume Chau",
    affiliation: "Directus web architect",
    avatarUrl: "/images/avatars/guillaume-chau.png",
    attendedIndex: 6,
    color: "navy",
    socialUrls: {
      github: "https://github.com/Akryum",
      x: "https://x.com/Akryum",
      bluesky: "https://bsky.app/profile/guillaume.akryum.dev",
    },
  },
  {
    id: "baku89",
    name: "Baku Hashimoto",
    title: "Experimental Filmmaker",
    avatarUrl: "/images/avatars/baku-hashimoto.png",
    attendedIndex: 7,
    color: "default",
    socialUrls: {
      github: "https://github.com/baku89",
      x: "https://x.com/_baku89",
    },
  },
  {
    id: "hi-ogawa",
    name: "Hiroshi Ogawa",
    affiliation: "VoidZero Inc.",
    title: "Vitest & Vite core team member",
    avatarUrl: "/images/avatars/hi-ogawa.png",
    attendedIndex: 8,
    color: "purple",
    socialUrls: {
      github: "https://github.com/hi-ogawa",
      bluesky: "https://bsky.app/profile/hiogawa.bsky.social",
      x: "https://twitter.com/hiroshi_18181",
    },
  },
  {
    id: "leaysgur",
    name: "Yuji Sugiura",
    affiliation: "PixelGrid Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/yuji-sugiura.png",
    attendedIndex: 9,
    color: "orange",
    socialUrls: {
      github: "https://github.com/leaysgur",
      x: "https://x.com/leaysgur",
    },
  },
  {
    id: "yamanoku",
    name: "yamanoku",
    title: "Company Employee",
    avatarUrl: "/images/avatars/yamanoku.png",
    color: "default",
    talkTitle: "Improving Web App Accessibility in the Generative AI Era",
    talkOverview: `In this session, we'll find out about useful, common methods for improving web application accessibility — not limited to development using Vue.js / Nuxt — by leveraging generative AI technologies as of October 2025.

You'll get useful advice you can put into practice, like how to choose the right tools, a thinking framework to guide your decisions, and a concrete action plan you can start applying right away.

Together, we’ll discover how all developers can use these new tools to build more accessible products for everyone.`,
    socialUrls: {
      github: "https://github.com/yamanoku",
      x: "https://x.com/yamanoku",
      bluesky: "https://bsky.app/profile/yamanoku.net",
    },
  },
  {
    id: "neginasu",
    name: "neginasu",
    affiliation: "DesignOne Japan, Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/neginasu.png",
    color: "purple",
    talkTitle: "Which Vue Validation Library Should We Really Use?\nThe Limits of Self-Made Validation and How I Finally Moved On",
    talkOverview: "Our product, built on Vue 3, had relied for years on a custom-built validation logic. However, over time, this homegrown solution began to show its limitations. A lack of documentation, inconsistent specifications, and the complexity of our proprietary setup all contributed to a growing maintenance burden. Eventually, the system became a significant source of technical debt that could no longer be ignored.\n\nIn this session, we'll walk you through how we confronted this issue. We'll share how we evaluated major Vue validation libraries—like Vuelidate, vee-validate, and Zod—what criteria guided our decision, and how we ultimately chose and implemented a new solution.\n\nBeyond just selecting a library, we'll discuss the tangible benefits we gained from the transition: comprehensive official documentation, ease of learning, and improved maintainability.\n\nWe'll also dive into real-world challenges we faced during the migration from our legacy validation system, strategies for partial coexistence, and phased rollout methods—highlighting how we bridged the gap between ideal plans and practical constraints.\n\nThis talk is especially relevant for:\n\nDevelopers struggling with the limitations of custom validation logic\n\nTeams considering introducing a validation library in a Vue 3 environment\n\nOur goal is to share insights that can help you tackle technical debt and move toward a healthier, more sustainable development experience.",
    socialUrls: {
      github: "https://github.com/neginasu",
      x: "https://x.com/neginasu_grid",
      bluesky: "https://bsky.app/profile/neginasu-grid.bsky.social",
    },
  },
  {
    id: "toddeTV",
    name: "Thorsten Seyschab",
    affiliation: "Self-employed",
    title: "Computer Scientist & Web Engineer",
    avatarUrl: "/images/avatars/todde-tv.jpg",
    color: "orange",
    talkTitle: "Playing with Vue in 3D",
    talkOverview: "Ever wondered how to bring interactive 3D experiences to webshops, or even create a mini-game, using VueJS? Discover the versatility of VueJS paired with WebGL to create immersive web-based applications. This talk showcases the technical depths of the WebGL Render API and its powerful wrapper libraries ThreeJS and TresJS, to unlock the third dimension in the browser.\n\nAimed at beginners and enthusiasts interested in web-based 3D development, this talk navigates through the challenges, limitations, and potential of these technologies. You will gain insights drawn from real-world projects, including a sneak peek into a mini-game concept. Walk away with a comprehensive understanding of how to integrate these tools into various applications, from eCommerce to gaming.",
    socialUrls: {
      github: "https://github.com/toddeTV",
      x: "https://x.com/toddeTV",
      bluesky: "https://bsky.app/profile/todde.tv",
    },
  },
  {
    id: "naitokosuke",
    name: "naitokosuke",
    affiliation: "mates Inc.",
    title: "Frontend Developer",
    avatarUrl: "/images/avatars/naitokosuke.png",
    color: "navy",
    talkTitle: "The Ultimate Developer Experience:\nNext Generation Vue/Nuxt Development with Nuxt Typed Router and Pinia Colada",
    talkOverview: `“Tired of errors from typos in route names?”
“Repeating the same boilerplate for data fetching state management?”
“Still relying on plain strings for routing—even with TypeScript?”

If these sound familiar in your Vue/Nuxt development workflow, this session is for you.

We'll dive into practical strategies for improving developer experience using \`Nuxt Typed Router\` and \`Pinia Colada\`. With automatic type generation from file-based routing, you'll get full autocompletion for route names and parameters. Declarative data fetching frees you from manually managing loading and error states.

Rich type information and declarative code don’t just help developers—they create an ideal environment for AI-assisted development as well.

We'll show you how to shift from tedious tasks to meaningful development by building a modern, AI-optimized setup—complete with real code examples and key considerations for adoption.`,
    socialUrls: {
      github: "https://github.com/naitokosuke",
      x: "https://x.com/@naitokosuke",
      bluesky: "https://bsky.app/profile/n-aito.bsky.social",
    },
  },
  {
    id: "vados-cosmonic",
    name: "Victor",
    affiliation: "Cosmonic",
    title: "Backend Engineer",
    avatarUrl: "/images/avatars/vados-cosmonic.png",
    color: "purple",
    talkTitle: "A New Vue: The Server Side WebAssembly/WASI Platform",
    talkOverview: "Not your grandad's emscripten -- the era of WebAssembly on the server is here, powered by WebAssembly System Interface (WASI) and WebAssembly Components. I'll show you how Vue apps fit into the new platform.\n\nIn this talk we'll cover what WebAssembly on the server is, why you might want to use it, and how Vue + Vite bring you access to another platform with (almost) no work on your part.",
    socialUrls: {
      github: "https://github.com/vados-cosmonic",
      x: "https://x.com/vadosware",
    },
  },
  {
    id: "hiranuma",
    name: "Shingo Hiranuma",
    affiliation: "GENEROSITY inc.",
    title: "CTO",
    avatarUrl: "/images/avatars/hiranuma.jpg",
    color: "default",
    talkTitle: "The Cutting Edge of Reactivity in Vue 3.6: Mastering Vapor and alien-signals for Reactive Performance",
    talkOverview: "What Are Alien Signals?\nAlien Signals is a new reactivity system introduced in Vue 3.6 that significantly boosts the efficiency of state updates. Compared to Vue 3.5, it reduces memory usage by 14% and enhances the performance of computed properties and side effects. As a result, even large-scale SPAs experience noticeably smoother performance.\n\nThe Innovation of Vapor Mode\nVapor Mode eliminates the overhead of the Virtual DOM by rendering DOM elements directly from components. It requires no changes to existing APIs and delivers exceptional performance—capable of mounting 100,000 components in just 100ms.\n\nPractical Tips\nThis session will cover migration steps for existing projects, common pitfalls in the new reactivity system, best practices for using Vapor Mode, and comparisons with other frameworks like SolidJS.",
    socialUrls: {
      github: "https://github.com/hiranuma",
      x: "https://x.com/waka_405",
      bluesky: "https://bsky.app/profile/waka405.bsky.social",
    },
  },
  {
    id: "sayn0",
    name: "sayn0",
    affiliation: "en-japan Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/sayn0.jpg",
    color: "orange",
    talkTitle: "Keeping Dependencies Up to Date with AI: A Practical Journey to Better Code Quality and Faster Development in Vue Projects",
    talkOverview: "Updating dependencies may seem like a minor task, but it's often nerve-wracking. With the rapid evolution of AI, however, that upgrade experience is starting to change in very real ways.\n\nIn this session, we'll explore how we used AI tools like Cursor and Claude Code to drive the upgrade of a real Vue codebase in a production service. Key highlights include:\n\n* Semi-automating the entire process from impact analysis to code transformation and test generation\n* Integrating AI into the QA process to cross-check specifications and test cases in real time\n* Visualizing project buffers and constraint slack to anticipate hidden risks\n* Measuring tangible improvements across multiple metrics—build times, bundle size, and cyclomatic complexity\n* Creating a feedback loop by logging AI suggestions for ongoing review and retraining\n\nWe'll share what got easier, what didn't go as planned, and how it *felt* to make this shift—giving you a candid look at the real-world impact of bringing AI into the upgrade process.",
    socialUrls: {
      x: "https://x.com/sayn0de",
    },
  },
  {
    id: "yuichkun",
    name: "Yuichi Yogo",
    affiliation: "Escentier",
    title: "Musician & Engineer",
    avatarUrl: "/images/avatars/yuichkun.jpg",
    color: "navy",
    talkTitle: "Building Production-Ready Audio Applications in Web",
    talkOverview: `Abstract:
Web applications are no longer silent. Thanks to the evolution of the Web Audio API, WebAssembly, and GPU acceleration, browser-based audio can now rival native environments. In this talk I will guide Vue (and broader front-end) developers through practical, production-ready strategies for integrating real-time audio processing into their apps—without sacrificing performance or user experience.

Key Takeaways:
- Web Audio API & AudioWorklet – Build a solid foundation for low-latency DSP in the browser.
- RNBO → WebAssembly – Build prototype-oriented audio modules in Cycling '74's RNBO and deploy them to the web via WebAssembly.
- JUCE – High-level overview of JUCE as a widely used framework in the audio community, with a brief note on how it may relate to web workflows.
- GPU-Accelerated Audio – Explore emerging patterns that offload DSP to the GPU for massive parallelism.
- Browser Limitations – Understand current constraints and proven work-arounds.

Target Audience:
Front-end engineers, creative coders, and audio developers who want to push Vue.js beyond visuals and into immersive sonic experiences.

Prerequisites:
Basic familiarity with JavaScript/TypeScript and Vue.js. No prior DSP knowledge required—concepts will be introduced from first principles.`,
    socialUrls: {
      github: "https://github.com/yuichkun",
      x: "https://x.com/@yogo_escentier",
    },
  },
  {
    id: "antfu",
    name: "Anthony Fu",
    affiliation: "NuxtLabs",
    title: "Design Engineer",
    avatarUrl: "/images/avatars/antfu.png",
    talkTitle: "Introducing Vite DevTools",
    talkOverview: "This talk will introduce the new Vite DevTools, share the background behind its development, and give you a glimpse of the actual interface. We'll also discuss our vision for the future and how tools like Rolldown and Vite itself are evolving and changing the way they're used.",
    color: "navy",
    socialUrls: {
      github: "https://github.com/antfu",
      x: "https://x.com/antfu7",
      bluesky: "https://bsky.app/profile/antfu.me",
    },
  },
];

export const LT_SPEAKERS: Speaker[] = [
  {
    id: "ssssota",
    name: "ssssota",
    affiliation: "ZOZO, inc.",
    title: "Frontend Developer",
    avatarUrl: "/images/avatars/ssssota.png",
    color: "default",
    talkTitle: "Why Do Rust-Based Tools Run Without a Rust Environment?",
    talkOverview: `These days, tools built with Rust are becoming mainstream. You've probably been hearing a lot about projects like Rolldown and Biome. There's even a rumor that at the company VoidZero, which aims to "build the next generation of JavaScript toolchains," half of their projects are now Rust-based.

It seems that we, as JavaScript/TypeScript engineers, are using Rust-based software without even realizing it—even though we have no memory of ever setting up a Rust development environment.

Let's take a fresh look at how these Rust-based tools work, especially in coordination with JavaScript.`,
    socialUrls: {
      github: "https://github.com/ssssota",
      x: "https://x.com/ssssotaro",
      bluesky: "https://bsky.app/profile/ssssota.bsky.social",
    },
  },
  {
    id: "NaokiHaba",
    name: "Naoki Haba",
    affiliation: "codmon inc",
    title: "Software Engineer",
    avatarUrl: "/images/avatars/naokihaba.png",
    color: "purple",
    talkTitle: "What Changes with the Singleton Data Fetching Layer in Nuxt 4",
    talkOverview: "The Singleton Data Fetching Layer being introduced in Nuxt4 is a new architecture that fundamentally solves the problems of traditional useFetch/useAsyncData. In this Lightning Talk, I'll explain in 5 minutes the new features that dramatically improve performance and developer experience, including reduced memory usage, reactive key support, and automatic data cleanup.",
    socialUrls: {
      github: "https://github.com/NaokiHaba",
      x: "https://x.com/naokihaba",
      bluesky: "https://bsky.app/profile/naokihaba.bsky.social",
    },
  },
  {
    id: "2nofa11",
    name: "ツノ",
    affiliation: "Bengo4.com, Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/tsuno.jpeg",
    color: "orange",
    talkTitle: "Getting Started with OSS Contribution Through Output: A Case Study on eslint-plugin-vue",
    talkOverview: "Many developers feel that contributing to open source is something they'd like to do—but it seems intimidating. I've felt the same.\n\nAt TSKaigi 2025, Anthony Fu introduced a library called `eslint-typegen`. His talk sparked my interest, so I decided to learn more about it and share what I learned in a public talk outside my company. That small act of output led to an unexpected opportunity: contributing `eslint-typegen` support to `eslint-plugin-vue`.\n\nIn this lightning talk, I'll reflect on that journey to show that *open source is closer than you think*. I'll cover:\n\n1. How a small talk and public output became the gateway to OSS contribution\n2. The technical growth I experienced through contributing\n3. The welcoming and open culture of the Vue ecosystem's OSS community\n\nI hope this story encourages more developers to take that first small step into the world of open source.",
    socialUrls: {
      github: "https://github.com/2nofa11",
      x: "https://x.com/2nofa11",
    },
  },
  {
    id: "rinchoku",
    name: "Rinchoku",
    title: "Engineer",
    avatarUrl: "/images/avatars/rinchoku.jpg",
    color: "navy",
    talkTitle: "Perception and Design (Short Version)",
    talkOverview: "Today, \"UI/UX\" has become a buzzword we hear all the time.\n\nBy designing user flows based on user stories and creating consistent design style guides, we aim to present a unified look and make actions clear for users.\n\nIn this talk, I hope to offer a fresh perspective on how we approach everyday design—by understanding how the human brain processes the information it receives through the eyes.",
    socialUrls: {
      github: "https://github.com/rinchoku",
      x: "https://x.com/stupid_owl",
    },
  },
  {
    id: "noriyuki-shimizu",
    name: "shiminori",
    affiliation: "Sole proprietorship",
    title: "Front Engineer",
    avatarUrl: "/images/avatars/shiminori.jpg",
    color: "default",
    talkTitle: "The Key to Cookie-Based State Management in Nuxt Authentication",
    talkOverview: "In this session, I'll share key considerations for managing authentication state using cookies when building a custom auth system in Nuxt.\n\nAs of now, there are no stable third-party solutions for email and password-based authentication in Nuxt, which has led us to implement our own.\n\nI'll walk you through the challenges we faced and the practical workarounds we found—especially around why simply using the `useCookie` composable didn't behave as expected, and what we did to address it.",
    socialUrls: {
      github: "https://github.com/noriyuki-shimizu",
      x: "https://x.com/@smnr14785228",
    },
  },
  {
    id: "Crayfisher-zari",
    name: "Nishihara",
    affiliation: "ICS inc",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/crayfisher_zari.jpg",
    color: "purple",
    talkTitle: "Building Japan's Digital Agency Design System in Vue.js as a Solo Developer",
    talkOverview: "In this talk, I'll share our experience implementing the Digital Agency's public design system using Vue.js. Along the way, I'll highlight some of the key strengths we discovered—particularly the power of `v-model` and `computed`—as we built out the system.",
    socialUrls: {
      github: "https://github.com/Crayfisher-zari",
      x: "https://x.com/@crayfisher_zari",
      bluesky: "https://bsky.app/profile/crayfisher-zari.bsky.social",
    },
  },
  {
    id: "yut0naga1",
    name: "Yuto NAGAI",
    affiliation: "HealthCare Innovation Group, Future Corporation",
    title: "Senior Consultant",
    avatarUrl: "/images/avatars/yut0naga1.jpg",
    color: "orange",
    talkTitle: "Could \"Vue Native\" the Vue Version of React Native Become a Reality?\nLet's Take a Look at Lynx, a Next-Generation Cross-Platform Framework, and Its Vue.js Support",
    talkOverview: "In March 2025, ByteDance—the company behind TikTok and CapCut—announced a new open-source, next-generation mobile cross-platform development framework called **Lynx**.\n\nLynx is now aiming to support **Vue.js**, potentially offering Vue developers a mobile-native development experience with minimal learning curve—much like what React Native does for React users.\n\nThere's already exciting momentum: Vue creator **Evan You** has publicly expressed support for Vue+Lynx on X (formerly Twitter), and Vue community member **Rahul Vashishtha** has even shared a working prototype on GitHub.\n\nGiven how new Lynx is, there's still very little documentation available—especially in Japanese—and it hasn't yet gained much attention in Vue circles.\n\nIn this talk, I'd love to introduce Vue+Lynx, highlight what's already happening (including Vashishtha's prototype), and share the excitement and possibilities this could bring to the Vue community. Let's explore what the future of Vue-powered native app development might look like—together.",
    socialUrls: {
      x: "https://x.com/yut0naga1",
    },
  },
  {
    id: "kaede-kato",
    name: "Kaede Kato",
    affiliation: "RIZAP TECHNOLOGIES,Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/kaede-kato.png",
    color: "navy",
    talkTitle: "Building the chocoZAP Service Reservation System In-House with Nuxt",
    talkOverview: `At chocoZAP, we had been using external services for booking self-esthetic and self-hair removal services.
This time, we have developed our own reservation system in Nuxt.

As a result, the development team can now independently design and improve the system,
and we have built a structure that allows us to flexibly enhance API communication and authentication in-house.

In this LT, we will introduce the technical architecture and the key points we focused on.`,
    socialUrls: {},
  },
];

export const PANEL_DISCUSSION_SPEAKERS: Speaker[] = [
  evan,
  {
    id: "gaearon",
    name: "Dan Abramov",
    affiliation: "Previously: React, Bluesky",
    avatarUrl: "/images/avatars/dan_abramov.png",
    attendedIndex: 2,
    color: "purple",
    socialUrls: {
      github: "https://github.com/gaearon",
      bluesky: "https://bsky.app/profile/danabra.mov",
    },
  },
  {
    id: "dominikg",
    name: "dominikg",
    affiliation: "Svelte & Vite core team member",
    avatarUrl: "/images/avatars/dominikg.png",
    attendedIndex: 3,
    color: "orange",
    socialUrls: {
      github: "https://github.com/dominikg",
      bluesky: "https://bsky.app/profile/dominikg.dev",
      mastodon: "https://elk.zone/m.webtoo.ls/@dominikg",
    },
  },
  {
    id: "kiaking",
    name: "Kia King Ishii",
    affiliation: "Global Brain",
    title: "Vue.js core team member",
    avatarUrl: "/images/avatars/kiaking.png",
    color: "navy",
    socialUrls: {
      github: "https://github.com/kiaking",
      x: "https://x.com/KiaKing85",
    },
  },
];

export const STUDENT_SUPPORT_SPEAKERS: Omit<Speaker, "id" | "color">[] = [
  {
    name: "kazupon",
    affiliation: "Plaid Inc.",
    title: "Vue.js core team member",
    avatarUrl: "/images/avatars/kazupon.png",
  },
  {
    name: "ubugeeei",
    affiliation: "mates Inc.",
    title: "Vue.js member",
    avatarUrl: "/images/avatars/ubugeeei.png",
  },
  {
    name: "Anthony Fu",
    affiliation: "NuxtLabs / Vercel",
    title: "Vue・Nuxt・Vite core team",
    avatarUrl: "/images/avatars/antfu.png",
  },
  {
    name: "Naoki Haba",
    affiliation: "codmon inc",
    title: "software engineer",
    avatarUrl: "/images/avatars/naokihaba.png",
  },
];
