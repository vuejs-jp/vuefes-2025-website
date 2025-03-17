<script setup lang="ts">
import {
  defineRouteRules,
  queryCollection,
  useAsyncData,
  useBreakpoint,
  useI18n,
} from "#imports";
import { ContentRenderer, Heading, Header, MainVisual } from "#components";

defineRouteRules({ prerender: true });

const { locale, t } = useI18n();

const bp = useBreakpoint();

const { data: message } = useAsyncData(locale.value, () =>
  queryCollection("i18n").path(`/${locale.value}/message`).first(),
);
</script>

<template>
  <MainVisual />

  <div class="content">
    <Header class="header" />

    <section class="message">
      <img
        :src="
          bp === 'pc'
            ? '/images/message-cover-pc.svg'
            : '/images/message-cover-sp.svg'
        "
        :alt="t('messageCoverImageAlt')"
      />
      <div class="message-content">
        <Heading>{{ t("message") }}</Heading>
        <ContentRenderer v-if="message" :value="message" />
      </div>
    </section>
  </div>

  <MainVisual />
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 0 auto;
  max-width: 700px;
  @media (--mobile) {
    max-width: none;
    width: 100%;
    padding: 0.25rem;
  }

  .header {
    position: sticky;
    top: 0;
    width: 100%;
    margin: 0.5rem;
  }

  .message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-m);
    background-color: var(--color-white);

    img {
      border-radius: var(--radius-m) var(--radius-m) 0 0;
      width: 100%;
      max-width: 700px;
      @media (--mobile) {
        max-width: none;
        width: 100%;
      }
    }

    .message-content {
      padding: 3.5rem;
      @media (--mobile) {
        padding: 0 1.5rem;
        margin: 1.5rem 0;
      }
    }
  }
}
</style>
