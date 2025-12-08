<script setup lang="ts">
import { HOME_HEADING_ID } from "~/constant";
import { useI18n } from "#imports";
import { VFSection } from "#components";
import { PHOTO_CATEGORIES } from "~~/i18n/photo";

const { t } = useI18n();

const CC0_URL = "https://creativecommons.jp/sciencecommons/aboutcc0/";

function getCategoryLabel(id: string): string {
  return t(`photo.categories.${id}`);
}
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.photo"
    :title="t('photo.title')"
    class="section-photo"
  >
    <i18n-t keypath="photo.description" tag="p" class="photo-description">
      <template #cc0Link>
        <a
          :href="CC0_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="cc0-link"
        >{{ t('photo.cc0LinkText') }}</a>
      </template>
    </i18n-t>
    <ul class="photo-list">
      <li
        v-for="category in PHOTO_CATEGORIES"
        :key="category.id"
        class="photo-list-item"
      >
        <a
          :href="category.url"
          target="_blank"
          rel="noopener noreferrer"
          class="photo-link"
        >
          {{ getCategoryLabel(category.id) }}
        </a>
      </li>
    </ul>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.photo-description {
  color: var(--color-text-default);
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 24px;

  @media (--mobile) {
    font-size: 14px;
    margin-bottom: 16px;
  }
}

.cc0-link {
  color: var(--color-primary-base);
  text-decoration: underline;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
}

.photo-list {
  list-style: disc;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (--mobile) {
    padding-left: 20px;
    gap: 8px;
  }
}

.photo-list-item {
  color: var(--color-text-default);
}

.photo-link {
  color: var(--color-primary-base);
  text-decoration: none;
  font-size: 16px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }

  @media (--mobile) {
    font-size: 14px;
  }
}
</style>
