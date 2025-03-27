import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  imports: { autoImport: false },
  experimental: {
    inlineRouteRules: true,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  modules: [
    "@nuxtjs/seo",
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@nuxtjs/storybook",
    "@primevue/nuxt-module",
    "@nuxt/scripts",
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
    // FIXME: https://github.com/vuejs-jp/vuefes-2025/issues/236
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: "i18n_redirected",
    //   redirectOn: "root",
    // },
  },

  content: {
    renderer: {
      anchorLinks: false,
    },
  },

  $production: {
    scripts: {
      registry: {
        googleAnalytics: {
          id: "G-H7VEJHSZH4",
        },
      },
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
          icons: FileSystemIconLoader("./public/images/icons", (svg) =>
            svg.replace(/#007F62/g, "var(--color-base)"),
          ),
          logo: FileSystemIconLoader("./public/images/logo", (svg) =>
            svg.replace(/#007F62/g, "var(--color-base)"),
          ),
        },
      }),
    ],
  },

  runtimeConfig: {
    public: {
      contactFormEndpoint: "https://vuejs-jp.form.newt.so/v1/UR5LmScZc",
    },
  },
});
