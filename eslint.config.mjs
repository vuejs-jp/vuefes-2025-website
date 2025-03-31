// @ts-check
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt()
  .append(...pluginVueA11y.configs["flat/recommended"])
  .override("nuxt/vue/single-root", {
    rules: {
      "vue/no-multiple-template-root": "off",
    },
  })
  .override("nuxt/vue/rules", {
    rules: {
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
    },
  }).append({
    rules: {
      "@stylistic/brace-style": "off",
    },
  });
