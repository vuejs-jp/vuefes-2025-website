<script setup lang="ts">
import { useI18n } from "#imports";

const { locale, setLocale } = useI18n();

async function switchLanguage(event: Event) {
  const locale = event.target as HTMLSelectElement;
  await setLocale(locale.value as "en" | "ja");
}
</script>

<template>
  <label for="language-select">
    <select id="language-select" :value="locale" @change="switchLanguage">
      <option v-for="lang in ['en', 'ja']" :key="lang" :value="lang">
        {{ lang }}
      </option>
    </select>
  </label>
</template>

<style scoped>
label {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;

  select {
    font-size: 1.5rem;
    padding: 0.5rem;
    border: 1px solid #333;
    border-radius: 0.5rem;
    background-color: #fff;
    color: #333;
    cursor: pointer;

    option {
      background-color: #fff;
      color: #333;
    }
  }
}
</style>
