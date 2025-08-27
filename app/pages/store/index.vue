<script setup lang="ts">
import { GOODS as enGoods } from "../../../i18n/en/goods";
import { GOODS as jaGoods } from "../../../i18n/ja/goods";
import StorePreOrderButton from "./_components/StorePreOrderButton.vue";
import StoreItemCard from "./_components/StoreItemCard.vue";
import {
  computed,
  useI18n,
  definePageMeta,
  useRuntimeConfig,
  // NOTE: import useHead to avoid `useHead is not defined` error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
  defineOgImage,
} from "#imports";
import { VFSection, JaStore, EnStore } from "#components";

definePageMeta({ prerender: true });
const { t, locale } = useI18n();

const runtimeConfig = useRuntimeConfig();

const goods = computed(() => locale.value === "en" ? enGoods : jaGoods);
const indent = computed(() => locale.value === "en" ? "0.7em" : "0.25em");

defineOgImage({
  url: `${runtimeConfig.public.siteUrl}images/og/store.png`,
});

useSeoMeta({
  title: t("store.title"),
  ogTitle: t("store.title"),
  description: t("store.description"),
  ogDescription: t("store.description"),
});
</script>

<template>
  <div id="pages-store">
    <h1>{{ $t('store.title') }}</h1>

    <VFSection :title="t('store.panel.title')">
      <component :is="locale === 'ja' ? JaStore : EnStore">
        <template #button>
          <div class="store-button-container">
            <StorePreOrderButton />
          </div>
        </template>
        <template #goods>
          <ul class="store-item-list">
            <StoreItemCard
              v-for="item in goods"
              :key="item.id"
              :item="item"
            />
          </ul>
        </template>
      </component>
    </VFSection>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-store{
  display: grid;
  row-gap: 1.5rem;

  @media (--mobile) {
    row-gap: 1rem;
  }

  h1 {
    font-family: "ClashDisplay-Semibold";
    font-size: 3rem;
    padding: 7.5rem 0;
    margin: 0;

    @media (--mobile) {
      padding: 2.5rem 0.75rem;
    }
  }

  .store-button-container {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 2rem;

    @media (--mobile) {
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }
  }

  .store-item-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    @media (--mobile) {
      row-gap: 2rem;
    }
  }

  :deep(.divider) {
    border: 0;
    border-top: 1px solid var(--color-divider);
    margin: 2rem 0;

    @media (--mobile) {
      margin: 1.5rem 0;
    }
  }

  :deep(.store-note) {
    text-indent: -1.25em;
    margin-left: 1.25em;

    span {
      margin-right: v-bind(indent);
    }
  }
}
</style>
