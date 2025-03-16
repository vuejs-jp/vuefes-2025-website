// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  future: { compatibilityVersion: 4 },
  imports: { autoImport: false },
  experimental: {
    inlineRouteRules: true,
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@nuxtjs/storybook",
  ],

  i18n: {
    langDir: ".",
    locales: [
      {
        code: "ja",
        language: "ja-JP",
        name: "日本語",
        file: "ja/ja.json",
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en/en.json",
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
