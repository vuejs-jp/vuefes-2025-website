<script setup lang="ts">
import { useI18n } from "#imports";
import type { MessageSchema } from "~~/i18n/message-schema";

const {
  type = "button",
  outlined = false,
  icon = false,
  link: to,
  external = false,
} = defineProps<{
  /** @default "button" */
  type?: "button" | "submit" | "reset";

  /** @default false */
  disabled?: boolean;

  /** @default false */
  outlined?: boolean;

  /** @default false */
  icon?: boolean;

  /** @default undefined */
  link?: string;

  /**
   * only works when `link` is true
   *
   * @default false
   */
  external?: true;
}>();

const emit = defineEmits<{
  click: [];
}>();

const { locale: lang } = useI18n<{ message: MessageSchema }>();
</script>

<template>
  <NuxtLink
    v-if="link"
    :to
    :lang
    :class="[
      {
        'button-outlined': outlined,
        'button-icon': icon,
      },
    ]"
    :external
    :target="external ? '_blank' : undefined"
    class="button"
    ><slot
  /></NuxtLink>
  <button
    v-else
    :type
    :lang
    :class="[
      {
        'button-outlined': outlined,
        'button-icon': icon,
      },
    ]"
    v-bind="$attrs"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

button,
a {
  padding: 1rem 2.5rem;
  border-radius: 6.25rem;
  background-color: var(--color-base);
  color: var(--color-white);
  border: none;

  cursor: pointer;

  /* align to h2 */
  font-size: 18px;
  line-height: 31px;
  @media (--mobile) {
    font-size: 16px;
  }

  &[lang="ja"] {
    font-family: IBMPlexSansJP-Bold;
  }

  &[lang="en"] {
    font-family: JetBrainsMono-Bold;
  }

  &:hover,
  &:active {
    background-color: var(--color-accent-hover);
  }

  &.button-outlined {
    background-color: transparent;
    border: 1px solid var(--color-place-holder);
    color: var(--color-text-default);
    text-decoration: none;
    &:hover,
    &:active {
      border: 1px solid var(--color-base);
      color: var(--color-base);
    }
  }

  &.button-icon {
    background-color: var(--color-white);
    :deep(svg),
    :deep(path) {
      fill: var(--color-base) !important;
    }
    border: 1px solid var(--color-divider-light);
    border-radius: var(--radius-m);

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    height: 5rem;
    padding: 0;

    @media (--mobile) {
      height: 4rem;
      padding: 0;
    }
  }
}

a {
  display: inline-block;
}
</style>
