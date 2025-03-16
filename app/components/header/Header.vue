<script setup lang="ts">
import { useI18n, watchEffect } from "#imports";

const { locale, setLocale } = useI18n();

watchEffect(async () => {
  await setLocale(locale.value as "en" | "ja");
});
</script>

<template>
  <header>
    <img
      class="logo-image"
      src="~/assets/images/logo-primary-base.svg"
      :alt="$t('logo.alt')"
    />

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
  </header>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

header {
  background-color: var(--color-white);
  border-radius: var(--radius-m);
  display: flex;
  justify-content: space-between;

  padding: 1.5rem 2rem;
  @media (--mobile) {
    padding: 1rem 1.5rem;
  }

  .logo-image {
    max-width: 60%;
    height: 3rem;
    @media (--mobile) {
      height: 2rem;
    }
  }

  .lang-switcher {
    display: flex;

    button {
      color: var(--color-place-holder);
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.125rem;

      &.active {
        color: var(--color-primary);
        text-decoration: underline;
      }
    }
  }
}
</style>
