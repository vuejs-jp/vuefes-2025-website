<script setup lang="ts">
import {
  defineRouteRules,
  queryCollection,
  useAsyncData,
  useBreakpoint,
  useI18n,
} from "#imports";

import {
  ContentRenderer,
  Footer,
  Heading,
  Header,
  MainVisual,
} from "#components";

import type { MessageSchema } from "~~/i18n/message-schema";

defineRouteRules({ prerender: true });

const { locale, t } = useI18n<{ message: MessageSchema }>();

const bp = useBreakpoint();

const { data: message } = useAsyncData(`message-${locale.value}`, () =>
  queryCollection("i18n").path(`/${locale.value}/message`).first(),
);

const { data: sponsorWanted } = useAsyncData(
  `sponsor-wanted-${locale.value}`,
  () => queryCollection("i18n").path(`/${locale.value}/sponsor-wanted`).first(),
);
</script>

<template>
  <MainVisual class="main-visual" />

  <div class="content">
    <div style="height: 100vh" />

    <Header class="header" />

    <section class="message">
      <img
        :src="
          bp === 'pc'
            ? '/images/top/cover/message-pc.svg'
            : '/images/top/cover/message-sp.svg'
        "
        :alt="t('messageCoverImageAlt')"
      />
      <div class="message-content">
        <Heading>{{ t("message") }}</Heading>
        <ContentRenderer v-if="message" :value="message" />
      </div>
    </section>

    <section class="sponsor-wanted">
      <img
        :src="
          bp === 'pc'
            ? '/images/top/cover/sponsor-wanted-pc.svg'
            : '/images/top/cover/sponsor-wanted-sp.svg'
        "
        :alt="t('sponsorWantedCoverImageAlt')"
      />
      <div class="sponsor-wanted-content">
        <Heading>{{ t("sponsorWanted") }}</Heading>
        <ContentRenderer v-if="sponsorWanted" :value="sponsorWanted" />
        <Button
          class="sponsor-apply-button"
          @click="
            () => {
              // TODO: link to form
            }
          "
          >{{ t("sponsorApplyButton") }}</Button
        >
      </div>
    </section>

    <h2 class="sns-introduction-heading">{{ t("snsIntroduction") }}</h2>

    <Footer />

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

  .header {
    position: sticky;
    top: 0;
    width: 100%;
    margin: 0.5rem;
  }

  .message,
  .sponsor-wanted {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-m);
    background-color: var(--color-white);

    margin-bottom: 1.5rem;
    @media (--mobile) {
      margin-bottom: 0.5rem;
    }

    img {
      border-radius: var(--radius-m) var(--radius-m) 0 0;
      width: 100%;
      max-width: 700px;
      @media (--mobile) {
        max-width: none;
        width: 100%;
      }
    }

    .message-content,
    .sponsor-wanted-content {
      padding: 3rem 3.5rem;
      @media (--mobile) {
        padding: 0 1.5rem;
        margin: 1.5rem 0;
      }
    }

    .sponsor-wanted-content {
      .sponsor-apply-button {
        display: block;
        margin: 0 auto;
        margin-top: 1.5rem;
        @media (--mobile) {
          margin-top: 1rem;
        }
      }
    }
  }

  .sns-introduction-heading {
    text-align: center;
    margin: 1rem 0 2rem 0;
    padding: 0 0.5rem;
  }
}
</style>
