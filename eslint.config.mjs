// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().override("nuxt/vue/single-root", {
  rules: { "vue/no-multiple-template-root": "off" },
});
// Your custom configs here
