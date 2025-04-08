<script setup lang="ts">
import { NuxtLink } from "#components";
import { useI18n, useLocalePath, useSwitchLocalePath } from "#imports";
import { useAnimationStore } from "~/stores/animation";

import Logo from "~icons/logo/logo";
import AnimationPlay from "~icons/icons/animation-play";
import AnimationPause from "~icons/icons/animation-pause";

const { isRoot = false } = defineProps<{
  /** @default false */
  isRoot?: boolean;
}>();

const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const { locale, t } = useI18n();
const [animationEnabled, setAnimationEnabled, isWebGLSupported] = useAnimationStore();
</script>

<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->

<template>
  <header>
    <div class="header">
      <component
        :is="isRoot ? 'div' : NuxtLink"
        v-bind="isRoot ? {} : { to: localePath('/'), title: t('backTop') }"
        class="logo"
      >
        <Logo class="logo-image" :aria-label="t('logo.alt')" role="img" />
      </component>
      <div class="header-control">
        <NuxtLink
          :to="switchLocalePath('ja')"
          lang="ja"
          title="日本語に切り替え"
          :class="{ active: locale === 'ja' }"
        >
          JA
        </NuxtLink>
        <div aria-hidden="true" class="language-separator">
          /
        </div>
        <NuxtLink
          :to="switchLocalePath('en')"
          lang="en"
          title="Switch to English"
          :class="{ active: locale === 'en' }"
        >
          EN
        </NuxtLink>

        <button
          type="button"
          class="animation-control"
          :disabled="!isWebGLSupported"
          :aria-label="animationEnabled ? $t('animation.pause') : $t('animation.play')"
          @click="setAnimationEnabled(!animationEnabled)"
        >
          <component
            :is="animationEnabled ? AnimationPause : AnimationPlay"
            :aria-label="animationEnabled ? $t('animation.pause') : $t('animation.play')"
            role="img"
          />
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
    padding: 1.5rem 2rem 1.25rem 2rem;
    border: 1px solid var(--color-divider-light);

    @media (--mobile) {
      padding: 1.25rem 1.4rem 1rem 1.5rem;
    }

    .logo {
      .logo-image {
        display: block;
        width: 258px;
        height: 48px;

        @media (--mobile) {
          width: 172px;
          height: 32px;
        }
      }

      &a {
        &:hover {

          :deep(svg),
          :deep(path) {
            fill: var(--color-accent-hover) !important;
          }
        }
      }
    }

    .header-control {
      display: flex;
      align-items: center;

      button,
      a {
        display: flex;
        padding: 0 0.125rem;
        text-decoration: none;
        align-items: center;
        color: var(--color-text-default);
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-family: JetBrainsMono-Regular;
        font-size: 1.125rem;

        &.active {
          color: var(--color-base);
          text-decoration: underline;
        }

        &.animation-control {
          padding: 0;
          margin-left: 1.375rem;

          @media (--mobile) {
            height: 32px;
            margin-left: 0.75rem;
          }

          &:disabled {
            /* to alter svg stroke */
            --color-base: var(--color-place-holder);
            cursor: not-allowed;
          }

          &:hover {
            --color-base: var(--color-accent-hover);
          }
        }
      }
    }
    .language-separator {
      color: var(--color-place-holder);
      font-size: 1.125rem;
      font-family: JetBrainsMono-Regular;
      line-height: 1.25;
    }
  }
}
</style>
