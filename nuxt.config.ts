/* eslint-disable nuxt/nuxt-config-keys-order */
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import type { NuxtPage } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "./modules/00.feature-flags.ts",
    "@nuxt/eslint",
    "@nuxt/scripts",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxtjs/storybook",
    "@primevue/nuxt-module",
    "nuxt-typed-router",
    "@sidebase/nuxt-auth",
    "nuxt-og-image",
  ],

  $production: {
    scripts: {
      registry: {
        googleAnalytics: {
          id: "G-H7VEJHSZH4",
        },
      },
    },
  },

  compatibilityDate: "2024-11-01",
  features: { inlineStyles: false },
  future: { compatibilityVersion: 4 },
  experimental: {
    inlineRouteRules: true,
    defaults: {
      nuxtLink: {
        // NOTE: removing noopener, noreferrer
        externalRelAttribute: "",
      },
    },
  },
  runtimeConfig: {
    // for OAuth
    authSecret: process.env.AUTH_SECRET,
    githubClientId: process.env.OAUTH_GITHUB_CLIENT_ID,
    githubClientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET_ID,
    googleClientId: process.env.OAUTH_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
    authOrigin: process.env.NODE_ENV === "production"
      ? process.env.CONTEXT === "production"
        ? "https://vuefes.jp/2025/api/auth"
        : `${process.env.DEPLOY_PRIME_URL}/2025/api/auth`
      : `http://localhost:${process.env.PORT || 3000}/api/auth`,

    // for Peatix API
    peatixApiOrigin: process.env.PEATIX_API_ORIGIN,
    peatixApiSecret: process.env.PEATIX_API_SECRET,
    peatixEventId: process.env.PEATIX_EVENT_ID,

    siteUrl: process.env.NODE_ENV === "production"
      ? process.env.CONTEXT === "production"
        ? "https://vuefes.jp/2025/"
        : `${process.env.DEPLOY_PRIME_URL}/2025/`
      : "http://localhost:3000/",

    public: {
      contactFormEndpoint: "https://vuejs-jp.form.newt.so/v1/UR5LmScZc",
      siteUrl: process.env.NODE_ENV === "production"
        ? process.env.CONTEXT === "production"
          ? "https://vuefes.jp/2025/"
          : `${process.env.DEPLOY_PRIME_URL}/2025/`
        : "http://localhost:3000/",
    },
  },
  components: [{ path: "~/components", pathPrefix: false }],
  imports: { autoImport: false },
  devtools: { enabled: true },
  app: { baseURL: process.env.NODE_ENV === "production" ? "/2025/" : "/" },
  // @nuxt/robot don't support generate robots.txt when setting baseURL
  robots: { robotsTxt: false },

  site: {
    // The name and description are set for each language in the following files:
    // i18n/ja/ja.json, i18n/en/en.json
    url:
      process.env.CONTEXT === "branch-deploy"
        ? "https://main--vuefes-2025.netlify.app"
        : process.env.NODE_ENV === "production"
          ? "https://vuefes.jp/"
          : "http://localhost:3000/",
  },

  plugins: ["~/plugins/v-click-outside.ts"],

  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      // peatix api cron runs at UTC 16:00 (JST 01:00), so execute about 15 minutes later
      "15 16 * * *": ["sync-role"],
    },
  },

  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          customMedia: true,
        },
        nonStandard: {
          deepSelectorCombinator: true,
        },
      },
    },
    plugins: [
      Icons({
        customCollections: {
          icons: FileSystemIconLoader("./public/images/icons", svg => svg.replace(/#007F62/g, "var(--color-base)")),
          logo: FileSystemIconLoader("./public/images/logo", svg => svg.replace(/#007F62/g, "var(--color-base)")),
        },
      }),
    ],
  },

  // Use `process.env.CONTEXT !== "production"` for dev only features
  featureFlags: {
    timetable: process.env.CONTEXT !== "production",
    staff: process.env.CONTEXT !== "production",

    soldOutAfterParty: true,
    soldOutEarlyBirdAfterParty: true,
    soldOutEarlyBird: true,
    soldOutGeneral: false, // turn on when sold out
    soldOutHandsOn: false, // turn on when sold out
    soldOutIndividualSponsor: false, // turn on when sold out

    guestDetailsEvan: false,
    guestDetailsDaniel: process.env.CONTEXT !== "production",
    guestDetailsJohnson: process.env.CONTEXT !== "production",
    guestDetailsAkryum: process.env.CONTEXT !== "production",
    guestDetailsBaku: process.env.CONTEXT !== "production",
    guestDetailsOgawa: process.env.CONTEXT !== "production",
    guestDetailsLeaysgur: process.env.CONTEXT !== "production",
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: "double",
      },
    },
  },

  i18n: {
    langDir: ".",
    locales: [
      {
        code: "ja",
        language: "ja-JP",
        name: "Japanese",
        file: "ja/index.yaml",
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en/index.yaml",
      },
    ],
    defaultLocale: "ja",
    // FIXME: https://github.com/vuejs-jp/vuefes-2025/issues/236
    detectBrowserLanguage: false,
  },

  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
    },
    enabled: true,
    runtimeCacheStorage: false,
    fonts: [
      {
        name: "JetBrainsMono-Regular",
        path: "/fonts/og/JetBrainsMono-Regular.ttf",
      },
      {
        name: "IBMPlexSansJP-Regular",
        path: "/fonts/og/IBMPlexSansJP-Regular.ttf",
      },
      {
        name: "IBMPlexSansJP-SemiBold",
        path: "/fonts/og/IBMPlexSansJP-SemiBold.ttf",
      },
      {
        name: "ClashDisplay-Medium",
        path: "/fonts/og/ClashDisplay-Medium.ttf",
      },
    ],
  },

  seo: {
    meta: {
      twitterSite: "@vuefes",
      twitterCreator: "@vuefes",
    },
  },
  // img:{
  //  domains: ['vuefes.jp/2025'],
  //  provider: "ipx",
  // },

  auth: {
    disableServerSideAuth: false,
    baseURL: process.env.NODE_ENV === "production"
      ? process.env.CONTEXT === "production"
        ? "https://vuefes.jp/2025/api/auth"
        : `${process.env.DEPLOY_PRIME_URL}/2025/api/auth`
      : `http://localhost:${process.env.PORT || 3000}/api/auth`,
    provider: {
      type: "authjs",
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      // The session will be refreshed every 5 second.
      enablePeriodically: 5000,
      enableOnWindowFocus: true,
    },
  },

  hooks: {
    // Private Folder Impl
    "pages:extend": (pages) => {
      const pagesToRemove: NuxtPage[] = [];
      pages.forEach((page) => {
        if (/\/_[^/]+/.test(page.path)) {
          pagesToRemove.push(page);
        }
      });
      pagesToRemove.forEach((page) => {
        pages.splice(pages.indexOf(page), 1);
      });
    },
  },
});
