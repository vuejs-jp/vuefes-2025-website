<script setup lang="ts">
import type { Goods } from "~~/i18n/goods";
import { useI18n } from "#imports";

interface Props {
  item: Goods;
}

defineProps<Props>();

const { t } = useI18n();

const formatPrice = (price: number) => {
  return `¥${price.toLocaleString()}`;
};
</script>

<template>
  <li class="store-item-card">
    <div class="item-image">
      <img :src="item.src" :alt="item.name" loading="lazy" />
    </div>
    <div class="item-content">
      <div class="item-name">
        {{ item.name }}
      </div>
      <div class="item-price">
        {{ formatPrice(item.price) }}
      </div>
      <div class="item-description">
        <p>{{ item.description }}</p>
        <br>
        <div class="item-specs">
          <p v-if="item.specs.color" class="spec-item">
            {{ t('store.color') }}{{ item.specs.color }}
          </p>
          <p v-if="item.specs.material" class="spec-item">
            {{ t('store.material') }}{{ item.specs.material }}
          </p>
          <p v-if="item.specs.size" class="spec-item">
            {{ t('store.size') }}{{ item.specs.size }}
          </p>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.store-item-card {
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 1rem;
  line-height: 1.5;
}

.item-content {
  display: grid;
  grid-template-rows: auto auto 1fr;
  row-gap: 0.25rem;
}

.item-image img {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
}

.item-name {
  font-size: 0.875rem;

  @media (--mobile) {
    font-size: 0.75rem;
  }
}

.item-price {
  font-size: 1.125rem;
  font-weight: 700;

  @media (--mobile) {
    font-size: 1rem;
  }
}

.item-description {
  font-size: 1rem;
  white-space: pre-wrap;

  @media (--mobile) {
    font-size: 0.875rem;
  }
}

.spec-item {
  margin: 0;
}
</style>
