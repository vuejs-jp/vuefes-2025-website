<script setup lang="ts">
import { VFButton, VFHeading, JaCodeOfConduct, EnCodeOfConduct } from "#components";
import {
  defineRouteRules,
  useI18n,

  // NOTE: import useHead to avoid `useHead is not defined` error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
  useLocalePath,
} from "#imports";

defineRouteRules({ prerender: true });

const { locale, t } = useI18n();

const localePath = useLocalePath();

useSeoMeta({ title: t("coc") });
</script>

<template>
  <section class="coc">
    <div class="coc-content" :class="{ 'lang-en': locale === 'en' }">
      <VFHeading :nth="1" class="heading">
        {{ t("coc") }}
      </VFHeading>

      <component :is="locale === 'ja' ? JaCodeOfConduct : EnCodeOfConduct" />

      <div class="back-top-button">
        <VFButton outlined :link="localePath('/')">
          {{ t("backTop") }}
        </VFButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.coc {
  width: 100%;
  border-radius: var(--radius-m);
  background-color: var(--color-white);

  .coc-content {
    padding: 3rem 3.5rem;

    :deep(.heading) {
      font-size: 1.25rem;
    }

    :deep(h2) {
      margin-top: 2.5rem;
      margin-bottom: 0.5rem;
      color: var(--color-text-default);
    }

    :deep(p:first-of-type) {
      margin-top: 3rem;
    }
    :deep(ul) {
      list-style-type: initial;
      margin: 0 0 0 1.5em;
    }
    :deep(ol) {
      list-style-type: decimal;
      margin: 0 0 0 1.25em;
    }
    &.lang-en {
      :deep(ol) {
        margin: 0 0 0 2em;
      }
    }

    @media (--mobile) {
      padding: 2rem 1.5rem 3rem;

      :deep(p:first-of-type) {
        margin-top: 1.5rem;
      }
    }

    .back-top-button {
      margin-top: 3rem;
      text-align: center;

      @media (--mobile) {
        margin-top: 1.5rem;
      }
    }
  }
}
</style>
