<script setup lang="ts">
import {
  ContentRenderer,
  MainVisual,
  VFButton,
  VFFooter,
  VFHeader,
  VFHeading,
} from "#components";
import {
  defineRouteRules,
  queryCollection,
  useAsyncData,
  useI18n,
} from "#imports";
import type { MessageSchema } from "~~/i18n/message-schema";

defineRouteRules({ prerender: true });

const { locale, t } = useI18n<{ message: MessageSchema }>();

const { data: privacy } = useAsyncData(`privacy-${locale.value}`, () =>
  queryCollection("i18n").path(`/${locale.value}/privacy`).first(),
);
</script>

<template>
  <MainVisual class="main-visual" />
  <div class="content">
    <VFHeader class="header" />
    <section class="privacy">
      <div class="privacy-content" :class="{ 'lang-en': locale === 'en' }">
        <VFHeading class="heading">{{ t("privacyPolicy") }}</VFHeading>
        <ContentRenderer v-if="privacy" :value="privacy" />
        <div class="back-top-button">
          <VFButton outlined link="/">{{ t("backTop") }}</VFButton>
        </div>
      </div>
    </section>
    <VFFooter />
    <div style="height: 100vh" />
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.main-visual {
  position: fixed;
  z-index: -1;
}

.content {
  margin: 0 auto;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 700px;

  @media (--mobile) {
    max-width: none;
    width: 100%;
    padding: 0.25rem;
  }
}
.header {
  position: sticky;
  top: 0;
  width: 100%;
  margin: 0.5rem;
}

.privacy {
  width: 100%;
  border-radius: var(--radius-m);
  background-color: var(--color-white);
  margin-bottom: 1.5rem;

  @media (--mobile) {
    margin-bottom: 0.5rem;
  }
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
}

.back-top-button {
  margin-top: 3rem;
  text-align: center;

  @media (--mobile) {
    margin-top: 1.5rem;
  }
}
</style>
