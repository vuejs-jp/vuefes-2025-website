/* eslint-disable nuxt/nuxt-config-keys-order */
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import type { NuxtPage } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/scripts",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxtjs/storybook",
    "@primevue/nuxt-module",
    "nuxt-typed-router",
    "@sidebase/nuxt-auth",
    "nuxt-og-image",
    "@nuxtjs/robots",
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

    // for server
    __FEATURE_TIMETABLE__: !["0", undefined].includes(process.env.FEATURE_TIMETABLE), // ?
    __FEATURE_EVENT__: !["0", undefined].includes(process.env.FEATURE_EVENT), // ?

    siteUrl: process.env.NODE_ENV === "production"
      ? process.env.CONTEXT === "production"
        ? "https://vuefes.jp/2025/"
        : `${process.env.DEPLOY_PRIME_URL}/2025/`
      : "http://localhost:3000/",

    public: {
      contactFormEndpoint: "https://vuejs-jp.form.newt.so/v1/UR5LmScZc",
    },
  },
  components: [{ path: "~/components", pathPrefix: false }],
  imports: { autoImport: false },
  devtools: { enabled: true },
  app: { baseURL: process.env.NODE_ENV === "production" ? "/2025/" : "/" },

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

  robots: {
    robotsTxt: false,
  },

  plugins: ["~/plugins/v-click-outside.ts"],

  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      // peatix api cron runs at UTC 16:00 (JST 01:00), so execute about 15 minutes later
      "15 16 * * *": ["db:sync-role"],
    },
  },

  vite: {
    define: {
      __FEATURE_TIMETABLE__: process.env.FEATURE_TIMETABLE || false, // ?
      __FEATURE_EVENT__: process.env.FEATURE_EVENT || false, // ?
    },
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
