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
    // "@nuxt/image",
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

  vite: {
    define: {
      __FEATURE_SPEAKERS__: process.env.FEATURE_SPEAKERS || false, // 2025-05-25 ~
      __FEATURE_CFP__: process.env.FEATURE_CFP || false, // 2025-06-01 ~
      __FEATURE_TICKET__: process.env.FEATURE_TICKET || false, //  2025-08-xx ~
      __FEATURE_SPONSOR_LIST__: process.env.FEATURE_SPONSOR_LIST || false,
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
          icons: FileSystemIconLoader("./public/images/icons", svg =>
            svg.replace(/#007F62/g, "var(--color-base)"),
          ),
          logo: FileSystemIconLoader("./public/images/logo", svg =>
            svg.replace(/#007F62/g, "var(--color-base)"),
          ),
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
