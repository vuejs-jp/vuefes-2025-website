/* eslint-disable nuxt/nuxt-config-keys-order */
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import type { NuxtPage } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/scripts", "@nuxtjs/i18n", "@nuxtjs/seo", // "@nuxt/image",
    "@nuxtjs/storybook", "@primevue/nuxt-module", "nuxt-typed-router", "@sidebase/nuxt-auth"],

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

    // for Peatix API
    peatixApiOrigin: process.env.PEATIX_API_ORIGIN,
    peatixApiSecret: process.env.PEATIX_API_SECRET,
    peatixEventId: process.env.PEATIX_EVENT_ID,

    // for server
    __FEATURE_TIMETABLE__: !["0", undefined].includes(process.env.FEATURE_TIMETABLE), // ?
    __FEATURE_EVENT__: !["0", undefined].includes(process.env.FEATURE_EVENT), // ?
    __FEATURE_TICKET_NAMECARD__: !["0", undefined].includes(process.env.FEATURE_TICKET_NAMECARD), //  2025-08-xx ~
    __FEATURE_SPONSOR_LIST__: !["0", undefined].includes(process.env.FEATURE_SPONSOR_LIST), // ?

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
    url: "https://vuefes.jp/",
  },

  robots: {
    robotsTxt: false,
  },

  plugins: ["~/plugins/v-click-outside.ts"],

  vite: {
    define: {
      __FEATURE_TIMETABLE__: process.env.FEATURE_TIMETABLE || false, // ?
      __FEATURE_EVENT__: process.env.FEATURE_EVENT || false, // ?
      __FEATURE_TICKET_NAMECARD__: process.env.FEATURE_TICKET_NAMECARD || false, //  2025-08-xx ~
      __FEATURE_SPONSOR_LIST__: process.env.FEATURE_SPONSOR_LIST || false, // ?
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
    enabled: false,
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
    baseURL: process.env.NODE_ENV === "production" ? `${process.env.AUTH_ORIGIN}/2025/api/auth` : `http://localhost:${process.env.PORT || 3000}/api/auth`,
    provider: {
      type: "authjs",
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      enablePeriodically: true,
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
