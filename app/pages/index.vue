<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import SectionCfp from "./_components/SectionCfp.vue";
import SectionSpeakers from "./_components/SectionSpeaker.vue";
import SectionMessage from "./_components/SectionMessage.vue";
import SectionSponsorWanted from "./_components/SectionSponsorWanted.vue";
import SectionContact from "./_components/SectionContact.vue";

import {
  defineRouteRules,
  useI18n,
  // NOTE: import useHead to avoid `useHead is not defined` error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
} from "#imports";

defineRouteRules({ prerender: true });

const { t } = useI18n();

useSeoMeta({ title: "" });

let SectionStudentSupport: ReturnType<typeof defineAsyncComponent> | null = null;
if (__FEATURE_STUDENT_SUPPORT__) {
  SectionStudentSupport = defineAsyncComponent(() =>
    import("./_components/SectionStudentSupport.vue"),
  );
}
</script>

<template>
  <div id="pages-index">
    <div class="section-container">
      <SectionCfp />
      <SectionSpeakers />
      <component :is="SectionStudentSupport" v-if="SectionStudentSupport" />
      <SectionMessage />
      <SectionSponsorWanted />
      <SectionContact />
    </div>

    <h2 class="sns-introduction-heading">
      {{ t("snsIntroduction") }}
    </h2>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.section-container {
  display: flex;
  position: relative;
  flex-direction: column;
  row-gap: 1.5rem;

  @media (--mobile) {
    row-gap: 1rem;
  }
}

.sns-introduction-heading {
  /* NOTE: Although this is a heading, using --color-primary-base makes it blend with the main visual, reducing readability. Therefore, --color-text-default is used instead. */
  color: var(--color-text-default);

  font-size: 20px;
  line-height: 34px;
  text-align: center;
  margin-top: 1.5rem;
  text-wrap-style: auto;

  @media (--mobile) {
    font-size: 18px;
    line-height: 31px;
    margin-top: 1rem;
  }
}
</style>
