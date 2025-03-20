<script setup lang="ts">
import { ContentRenderer, VFButton, VFHeading } from "#components";
import {
  defineRouteRules,
  queryCollection,
  useAsyncData,
  useI18n,

  // NOTE: import useHead to avoid `useHead is not defined` error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
} from "#imports";
import type { MessageSchema } from "~~/i18n/message-schema";

defineRouteRules({ prerender: true });

const { locale, t } = useI18n<{ message: MessageSchema }>();
useSeoMeta({ title: t("privacyPolicy") });

const { data: privacy } = useAsyncData(`privacy-${locale.value}`, () =>
  queryCollection("i18n").path(`/${locale.value}/privacy`).first(),
);
</script>

<template>
  <section class="privacy">
    <div class="privacy-content" :class="{ 'lang-en': locale === 'en' }">
      <VFHeading :nth="1" class="heading">{{ t("privacyPolicy") }}</VFHeading>

      <ContentRenderer v-if="privacy" :value="privacy" />

      <div class="back-top-button">
        <VFButton outlined link="/">{{ t("backTop") }}</VFButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.privacy {
  width: 100%;
  border-radius: var(--radius-m);
  background-color: var(--color-white);
  margin-bottom: 1.5rem;

  @media (--mobile) {
    margin-bottom: 0.5rem;
  }

  .privacy-content {
    padding: 3rem 3.5rem;

    :deep(.heading) {
      font-size: 1.25rem;
    }

    :deep(h2:not(.heading)) {
      margin-top: 2.5rem;
      color: var(--color-text-default);
    }

    :deep(p) {
      margin-top: 0.5rem;
    }
    :deep(p:first-of-type) {
      margin-top: 3rem;
    }
    :deep(ul) {
      list-style-type: initial;
      margin-left: 1.5em;
    }
    :deep(ol) {
      list-style-type: decimal;
      margin-left: 1.25em;
    }
    &.lang-en {
      :deep(ol) {
        margin-left: 2em;
      }
    }

    @media (--mobile) {
      padding: 0 1.5rem;
      margin: 1.5rem 0;

      :deep(h2:not(.heading)) {
        margin-top: 2.5rem;
      }
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
