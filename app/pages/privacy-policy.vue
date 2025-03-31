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
  useLocalePath,
} from "#imports";
import type { MessageSchema } from "~~/i18n/message-schema";

defineRouteRules({ prerender: true });

const { locale, t } = useI18n<{ message: MessageSchema }>();

const localePath = useLocalePath();

useSeoMeta({ title: t("privacyPolicy") });

const { data: privacy } = useAsyncData(`privacy-${locale.value}`, () =>
  queryCollection("i18n").path(`/${locale.value}/privacy`).first(),
);
</script>

<template>
  <section class="privacy">
    <div class="privacy-content" :class="{ 'lang-en': locale === 'en' }">
      <VFHeading :nth="1" class="heading">
        {{ t("privacyPolicy") }}
      </VFHeading>

      <ContentRenderer v-if="privacy" :value="privacy" />

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

.privacy {
  width: 100%;
  border-radius: var(--radius-m);
  background-color: var(--color-white);

  .privacy-content {
    padding: 3rem 3.5rem;

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
