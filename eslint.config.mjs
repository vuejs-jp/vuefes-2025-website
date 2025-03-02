// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";

export default withNuxt()
  .append(...pluginVueA11y.configs["flat/recommended"])
  .override("nuxt/vue/single-root", {
    rules: { "vue/no-multiple-template-root": "off" },
  });
