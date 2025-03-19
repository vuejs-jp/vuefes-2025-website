// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  imports: { autoImport: false },
  experimental: {
    inlineRouteRules: true,
  },

  modules: [
    "@nuxtjs/seo",
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@nuxtjs/storybook",
  ],

  site: {
    // nameとdescriptionは言語ごとに以下のファイルで設定
    // i18n/ja/ja.json, i18n/en/en.json
    url: "https://vuefes.jp/2025",
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

  i18n: {
    langDir: ".",
    locales: [
      {
        code: "ja",
        language: "ja-JP",
        name: "日本語",
        file: "ja/ja.ts",
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en/en.ts",
      },
    ],
    defaultLocale: "ja",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  content: {
    renderer: {
      anchorLinks: false,
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
  },
});
