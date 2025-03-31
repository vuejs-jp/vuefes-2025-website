<script setup lang="ts">
import { NuxtLink } from "#components";
import { useI18n, useLocalePath } from "#imports";
import type { MessageSchema } from "~~/i18n/message-schema";
import { useAnimationStore } from "~/stores/animation";

import Logo from "~icons/logo/logo";
import AnimationPlay from "~icons/icons/animation-play";
import AnimationPause from "~icons/icons/animation-pause";

const { isRoot = false } = defineProps<{
  /** @default false */
  isRoot?: boolean;
}>();

const localePath = useLocalePath();
const { locale, setLocale, t } = useI18n<{ message: MessageSchema }>();
const [animationEnabled, setAnimationEnabled, isWebGLSupported] = useAnimationStore();
</script>

<template>
  <header>
    <div class="header">
      <component
        :is="
          isRoot ? 'div': NuxtLink"
        v-bind="isRoot
          ? {}
          : {
            to: localePath('/'),
            title: t('backTop'),
          }"
        class="logo"
      >
        <Logo class="logo-image" :aria-label="t('logo.alt')" role="img" />
      </component>
      <div class="header-control">
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

        <button
          type="button"
          class="animation-control"
          :aria-label="
            animationEnabled ? $t('animation.pause') : $t('animation.play')
          "
          :disabled="!isWebGLSupported"
          @click="setAnimationEnabled(!animationEnabled)"
        >
          <component
            :is="animationEnabled ? AnimationPause : AnimationPlay"
            :aria-label="
              animationEnabled ? $t('animation.pause') : $t('animation.play')
            "
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
    padding: 1.5rem 1.625rem 1.25rem 2rem;
    border: 1px solid var(--color-divider-light);

    @media (--mobile) {
      padding: 1.25rem 1.125rem 1rem 1.5rem;
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
      gap: 0.25rem;

      button {
        display: flex;
        align-items: center;
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

        &.animation-control {
          margin-left: 0.5rem;
          @media (--mobile) {
            height: 32px;
            margin-left: 0;
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
  }
}
</style>
