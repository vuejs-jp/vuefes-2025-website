import type { StorybookConfig } from "@storybook-vue/nuxt";

const config: StorybookConfig = {
  stories: ["../**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  staticDirs: [
    {
      from: "../app/assets/",
      to: "~/assets/",
    },
    "../public",
  ],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false,
      },
    },
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook-vue/nuxt",
    options: {},
  },
};
export default config;
