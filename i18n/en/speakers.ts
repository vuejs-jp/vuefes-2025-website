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
    title: "Experimental Filmmaker",
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
  {
    name: "Anthony Fu",
    affiliation: "NuxtLabs",
    title: "Design Engineer",
    avatarUrl: "/images/avatars/antfu.png",
    talkOverview: "This talk will introduce the new Vite DevTools, share the background behind its development, and give you a glimpse of the actual interface. We'll also discuss our vision for the future and how tools like Rolldown and Vite itself are evolving and changing the way they're used.",
    socialUrls: {
      github: "https://github.com/antfu",
      x: "https://x.com/antfu7",
      bluesky: "https://bsky.app/profile/antfu.me",
    },
  },
  {
    name: "yamanoku",
    title: "Company Employee",
    avatarUrl: "/images/avatars/yamanoku.png",
    talkOverview: "In this session, we'll explore practical, general-purpose strategies for improving web application accessibility—not limited to Vue.js or Nuxt—by leveraging generative AI technologies as of October 2025. You'll walk away with actionable insights, including key points for selecting the right tools, a thinking framework to guide your decisions, and a concrete action plan you can start applying right away. Together, we'll discover how all developers can harness these new tools to build more inclusive products for everyone.",
    socialUrls: {
      github: "https://github.com/yamanoku",
      x: "https://x.com/yamanoku",
      bluesky: "https://bsky.app/profile/yamanoku.net",
    },
  },
  {
    name: "neginasu",
    affiliation: "DesignOne Japan, Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/neginasu.png",
    talkOverview: "Our product, built on Vue 3, had relied for years on a custom-built validation logic. However, over time, this homegrown solution began to show its limitations. A lack of documentation, inconsistent specifications, and the complexity of our proprietary setup all contributed to a growing maintenance burden. Eventually, the system became a significant source of technical debt that could no longer be ignored. In this session, we'll walk you through how we confronted this issue. We'll share how we evaluated major Vue validation libraries—like Vuelidate, vee-validate, and Zod—what criteria guided our decision, and how we ultimately chose and implemented a new solution. Beyond just selecting a library, we'll discuss the tangible benefits we gained from the transition: comprehensive official documentation, ease of learning, and improved maintainability. We'll also dive into real-world challenges we faced during the migration from our legacy validation system, strategies for partial coexistence, and phased rollout methods—highlighting how we bridged the gap between ideal plans and practical constraints. This talk is especially relevant for: Developers struggling with the limitations of custom validation logic Teams considering introducing a validation library in a Vue 3 environment Our goal is to share insights that can help you tackle technical debt and move toward a healthier, more sustainable development experience.",
    socialUrls: {
      github: "https://github.com/neginasu",
      x: "https://x.com/neginasu_grid",
      bluesky: "https://bsky.app/profile/neginasu-grid.bsky.social",
    },
  },
  {
    name: "Thorsten Seyschab",
    affiliation: "Self-employed",
    title: "Computer Scientist & Web Engineer",
    avatarUrl: "/images/avatars/todde-tv.jpg",
    talkOverview: "Ever wondered how to bring interactive 3D experiences to webshops, or even create a mini-game, using VueJS? Discover the versatility of VueJS paired with WebGL to create immersive web-based applications. This talk showcases the technical depths of the WebGL Render API and its powerful wrapper libraries ThreeJS and TresJS, to unlock the third dimension in the browser. Aimed at beginners and enthusiasts interested in web-based 3D development, this talk navigates through the challenges, limitations, and potential of these technologies. You will gain insights drawn from real-world projects, including a sneak peek into a mini-game concept. Walk away with a comprehensive understanding of how to integrate these tools into various applications, from eCommerce to gaming.",
    socialUrls: {
      github: "https://github.com/toddeTV",
      x: "https://x.com/toddeTV",
      bluesky: "https://bsky.app/profile/todde.tv",
    },
  },
  {
    name: "naitokosuke",
    affiliation: "mates Inc.",
    title: "Frontend Developer",
    avatarUrl: "/images/avatars/naitokosuke.png",
    talkOverview: "\"Tired of errors from typos in route names?\" \"Repeating the same boilerplate for data fetching state management?\" \"Still relying on plain strings for routing—even with TypeScript?\" If these sound familiar in your Vue/Nuxt development workflow, this session is for you. We'll dive into practical strategies for improving developer experience using `typed-router` and `Pinia Colada`. With automatic type generation from file-based routing, you'll get full autocompletion for route names and parameters. Declarative data fetching frees you from manually managing loading and error states. Rich type information and declarative code don't just help developers—they create an ideal environment for AI-assisted development as well. We'll show you how to shift from tedious tasks to meaningful development by building a modern, AI-optimized setup—complete with real code examples and key considerations for adoption.",
    socialUrls: {
      github: "https://github.com/naitokosuke",
      x: "https://x.com/@naitokosuke",
      bluesky: "https://bsky.app/profile/n-aito.bsky.social",
    },
  },
  {
    name: "Shingo Hiranuma",
    affiliation: "GENEROSITY inc.",
    title: "CTO",
    avatarUrl: "/images/avatars/hiranuma.jpg",
    talkOverview: "What Are Alien Signals? Alien Signals is a new reactivity system introduced in Vue 3.6 that significantly boosts the efficiency of state updates. Compared to Vue 3.5, it reduces memory usage by 14% and enhances the performance of computed properties and side effects. As a result, even large-scale SPAs experience noticeably smoother performance. The Innovation of Vapor Mode Vapor Mode eliminates the overhead of the Virtual DOM by rendering DOM elements directly from components. It requires no changes to existing APIs and delivers exceptional performance—capable of mounting 100,000 components in just 100ms. Practical Tips This session will cover migration steps for existing projects, common pitfalls in the new reactivity system, best practices for using Vapor Mode, and comparisons with other frameworks like SolidJS.",
    socialUrls: {
      github: "https://github.com/hiranuma",
      x: "https://x.com/waka_405",
      bluesky: "https://bsky.app/profile/waka405.bsky.social",
    },
  },
  {
    name: "Victor",
    affiliation: "Cosmonic",
    title: "Backend Engineer",
    avatarUrl: "/images/avatars/vados-cosmonic.png",
    talkOverview: "Not your grandad's emscripten -- the era of WebAssembly on the server is here, powered by WebAssembly System Interface (WASI) and WebAssembly Components. I'll show you how Vue apps fit into the new platform. In this talk we'll cover what WebAssembly on the server is, why you might want to use it, and how Vue + Vite bring you access to another platform with (almost) no work on your part.",
    socialUrls: {
      github: "https://github.com/vados-cosmonic",
      x: "https://x.com/vadosware",
    },
  },
  {
    name: "sayn0",
    affiliation: "en-japan Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/sayn0.jpg",
    talkOverview: "Updating dependencies may seem like a minor task, but it's often nerve-wracking. With the rapid evolution of AI, however, that upgrade experience is starting to change in very real ways. In this session, we'll explore how we used AI tools like Cursor and Claude Code to drive the upgrade of a real Vue codebase in a production service. Key highlights include: * Semi-automating the entire process from impact analysis to code transformation and test generation * Integrating AI into the QA process to cross-check specifications and test cases in real time * Visualizing project buffers and constraint slack to anticipate hidden risks * Measuring tangible improvements across multiple metrics—build times, bundle size, and cyclomatic complexity * Creating a feedback loop by logging AI suggestions for ongoing review and retraining We'll share what got easier, what didn't go as planned, and how it *felt* to make this shift—giving you a candid look at the real-world impact of bringing AI into the upgrade process.",
    socialUrls: {
      x: "https://x.com/sayn0de",
    },
  },
  {
    name: "Yuichi Yogo",
    affiliation: "Escentier",
    title: "Musician & Engineer",
    avatarUrl: "/images/avatars/yuichkun.jpg",
    talkOverview: "Abstract: Web applications are no longer silent. Thanks to the evolution of the Web Audio API, WebAssembly, and GPU acceleration, browser-based audio can now rival native environments. In this talk I will guide Vue (and broader front-end) developers through practical, production-ready strategies for integrating real-time audio processing into their apps—without sacrificing performance or user experience. Key Takeaways: - Web Audio API & AudioWorklet – Build a solid foundation for low-latency DSP in the browser. - RNBO → WebAssembly – Build production-ready audio modules in Cycling '74's RNBO and deploy them to the web via WebAssembly. - GPU-Accelerated Audio – Explore emerging patterns that offload DSP to the GPU for massive parallelism. - Browser Limitations – Understand current constraints and proven work-arounds. - Hybrid Desktop / Web Workflows – See how JUCE 8 + WebView and Vue.js can bridge plug-ins and web interfaces.",
    socialUrls: {
      github: "https://github.com/yuichkun",
      x: "https://x.com/@yogo_escentier",
    },
  },

];

export const LT_SPEAKERS: Speaker[] = [
  {
    name: "ssssota",
    affiliation: "ZOZO, inc.",
    title: "Frontend Developer",
    avatarUrl: "/images/avatars/ssssota.png",
    talkOverview: "Rust-based tools are becoming increasingly prominent—names like Rolldown and Biome are popping up more and more. There are even rumors that a company called VoidZero, which claims to be building \"the next-gen JavaScript toolchain,\" now has half its projects written in Rust. As JavaScript/TypeScript engineers, many of us are unknowingly using Rust-powered software—even without ever setting up a Rust development or runtime environment ourselves. In this talk, we'll take a step back and break down how these Rust-based tools actually work under the hood, and how they seamlessly integrate with the JavaScript ecosystem.",
    socialUrls: {
      github: "https://github.com/ssssota",
      x: "https://x.com/ssssotaro",
      bluesky: "https://bsky.app/profile/ssssota.bsky.social",
    },
  },
  {
    name: "Naoki Haba",
    affiliation: "codmon inc",
    title: "Software Engineer",
    avatarUrl: "/images/avatars/naokihaba.png",
    talkOverview: "Nuxt 4 introduces the **Singleton Data Fetching Layer**, a brand-new architecture that fundamentally solves long-standing issues with `useFetch` and `useAsyncData`. In this 5-minute lightning talk, we'll break down the key features that dramatically improve both performance and developer experience—such as reduced memory usage, support for reactive keys, and automatic data cleanup. We'll also share real-world migration examples and performance benchmarks to equip you with the knowledge you need to prepare for a smooth transition to Nuxt 4.",
    socialUrls: {
      github: "https://github.com/NaokiHaba",
      x: "https://x.com/naokihaba",
      bluesky: "https://bsky.app/profile/naokihaba.bsky.social",
    },
  },
  {
    name: "ツノ",
    affiliation: "Bengo4.com, Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/tsuno.jpeg",
    talkOverview: "Many developers feel that contributing to open source is something they'd like to do—but it seems intimidating. I've felt the same. At TSKaigi 2025, Anthony Fu introduced a library called `eslint-typegen`. His talk sparked my interest, so I decided to learn more about it and share what I learned in a public talk outside my company. That small act of output led to an unexpected opportunity: contributing `eslint-typegen` support to `eslint-plugin-vue`. In this lightning talk, I'll reflect on that journey to show that *open source is closer than you think*. I'll cover: 1. How a small talk and public output became the gateway to OSS contribution 2. The technical growth I experienced through contributing 3. The welcoming and open culture of the Vue ecosystem's OSS community I hope this story encourages more developers to take that first small step into the world of open source.",
    socialUrls: {
      github: "https://github.com/2nofa11",
      x: "https://x.com/2nofa11",
    },
  },
  {
    name: "Rinchoku",
    title: "Engineer",
    avatarUrl: "/images/avatars/rinchoku.jpg",
    talkOverview: "Today, \"UI/UX\" has become a buzzword we hear all the time. By designing user flows based on user stories and creating consistent design style guides, we aim to present a unified look and make actions clear for users. In this talk, I hope to offer a fresh perspective on how we approach everyday design—by understanding how the human brain processes the information it receives through the eyes.",
    socialUrls: {
      github: "https://github.com/rinchoku",
      x: "https://x.com/stupid_owl",
    },
  },
  {
    name: "shiminori",
    affiliation: "Sole proprietorship",
    title: "Front Engineer",
    avatarUrl: "/images/avatars/shiminori.jpg",
    talkOverview: "In this session, I'll share key considerations for managing authentication state using cookies when building a custom auth system in Nuxt. As of now, there are no stable third-party solutions for email and password-based authentication in Nuxt, which has led us to implement our own. I'll walk you through the challenges we faced and the practical workarounds we found—especially around why simply using the `useCookie` composable didn't behave as expected, and what we did to address it.",
    socialUrls: {
      github: "https://github.com/noriyuki-shimizu",
      x: "https://x.com/@smnr14785228",
    },
  },
  {
    name: "Nishihara",
    affiliation: "ICS inc",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/crayfisher_zari.jpg",
    talkOverview: "In this talk, I'll share our experience implementing the Digital Agency's public design system using Vue.js. Along the way, I'll highlight some of the key strengths we discovered—particularly the power of `v-model` and `computed`—as we built out the system.",
    socialUrls: {
      github: "https://github.com/Crayfisher-zari",
      x: "https://x.com/@crayfisher_zari",
      bluesky: "https://bsky.app/profile/crayfisher-zari.bsky.social",
    },
  },
  {
    name: "Yuto NAGAI",
    affiliation: "HealthCare Innovation Group, Future Corporation",
    title: "Senior Consultant",
    avatarUrl: "/images/avatars/yut0naga1.jpg",
    talkOverview: "In March 2025, ByteDance—the company behind TikTok and CapCut—announced a new open-source, next-generation mobile cross-platform development framework called **Lynx**. Lynx is now aiming to support **Vue.js**, potentially offering Vue developers a mobile-native development experience with minimal learning curve—much like what React Native does for React users. There's already exciting momentum: Vue creator **Evan You** has publicly expressed support for Vue+Lynx on X (formerly Twitter), and Vue community member **Rahul Vashishtha** has even shared a working prototype on GitHub. Given how new Lynx is, there's still very little documentation available—especially in Japanese—and it hasn't yet gained much attention in Vue circles. In this talk, I'd love to introduce Vue+Lynx, highlight what's already happening (including Vashishtha's prototype), and share the excitement and possibilities this could bring to the Vue community. Let's explore what the future of Vue-powered native app development might look like—together.",
    socialUrls: {
      x: "https://x.com/yut0naga1",
    },
  },
  {
    name: "Kaede Kato",
    affiliation: "RIZAP TECHNOLOGIES,Inc.",
    title: "Frontend Engineer",
    avatarUrl: "/images/avatars/kaede-kato.png",
    talkOverview: "At chocoZAP, we previously relied on external services for booking self-care and self-hair removal appointments—but we've now fully brought that functionality in-house, rebuilding everything with Nuxt. We designed tailored UIs for both web and app (WebView) platforms, focusing on making daily interactions feel intuitive and seamless. In this lightning talk, I'll share key highlights from the project and the strategies we used to optimize the experience. Topics include (subject to time constraints): UI Structure and State Management in Nuxt  * How we structured components (e.g., using `views` and `templates`) to boost reusability and maintainability  * Using the `server/` directory to organize API communication cleanly Flexible Improvement Cycles Enabled by In-House Development  * Fine-grained UI behavior adjustments based on API responses  * Better UX for edge cases like reaching booking limits, reducing user confusion Alignment with chocoZAP's Design System  * Implementing UI consistent with our internal design system, ensuring a unified brand experience across screens Rapid Feedback Loops  * How we quickly incorporated user feedback to minimize friction and improve daily usability This talk is a look behind the scenes at how we built a smoother, more responsive reservation experience—tailored to our users' real-world needs.",
    socialUrls: {},
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
    title: "Vue.js core team member",
    avatarUrl: "/images/avatars/kiaking.png",
    socialUrls: {
      github: "https://github.com/kiaking",
      x: "https://x.com/KiaKing85",
    },
  },
];
