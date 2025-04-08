import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import vueI18n from "@intlify/eslint-plugin-vue-i18n";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt()
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
  })
  .append({
    ignores: [
      ".github/dependabot.yml",
      "i18n/**/*.yaml",
      "app/components/_i18n",
    ],
  })
  .append({
    rules: {
      "@stylistic/brace-style": "off",
    },
  })
  .append(...pluginVueA11y.configs["flat/recommended"], {
    rules: {
      "vuejs-accessibility/form-control-has-label": "off",
      "vuejs-accessibility/label-has-for": "off",
    },
  })
  .append(vueI18n.configs.recommended, {
    rules: {
      "@intlify/vue-i18n/no-missing-keys": "error",
      "@intlify/vue-i18n/no-raw-text": "error",
    },
    settings: {
      "vue-i18n": {
        localeDir: "i18n/**/*.yaml",
      },
    },
  });
