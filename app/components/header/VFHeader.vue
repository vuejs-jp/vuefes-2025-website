<script setup lang="ts">
import { onMounted, useI18n, watch } from "#imports";
import type { MessageSchema } from "~~/i18n/message-schema";
import Logo from "~icons/logo/logo";

const { locale, setLocale } = useI18n<{ message: MessageSchema }>();

function handleLocaleChange(newLocale: typeof locale.value) {
  setLocale(newLocale);
  document.documentElement.lang = newLocale;
}

watch(locale, (v) => handleLocaleChange(v));
onMounted(() => handleLocaleChange(locale.value));
</script>

<template>
  <header>
    <div class="header">
      <Logo class="logo-image" />

      <div class="lang-switcher">
        <button
          type="button"
          :class="{ active: locale === 'ja' }"
          @click="setLocale('ja')"
        >
          JA
        </button>
        <button
          type="button"
          :class="{ active: locale === 'en' }"
          @click="setLocale('en')"
        >
          EN
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

header {
  .header {
    background-color: var(--color-white);
    border-radius: var(--radius-m);
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1.625rem 1.25rem 2rem;
    border: 1px solid var(--color-divider-light);

    @media (--mobile) {
      padding: 1.25rem 1.125rem 1rem 1.5rem;
    }

    .logo-image {
      display: block;
      width: 258px;
      height: 48px;
      @media (--mobile) {
        width: 172px;
        height: 32px;
      }

      :deep(svg),
      :deep(path) {
        fill: var(--color-base) !important;
      }
    }

    .lang-switcher {
      display: flex;
      gap: 0.25rem;

      button {
        color: var(--color-place-holder);
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-family: JetBrainsMono-Regular;
        font-size: 1.125rem;

        &.active {
          color: var(--color-base);
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
