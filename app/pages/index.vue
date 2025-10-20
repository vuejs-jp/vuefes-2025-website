<script setup lang="ts">
import SectionAccess from "./_components/SectionAccess.vue";
import SectionContact from "./_components/SectionContact.vue";
import SectionEvent from "./_components/SectionEvent.vue";
import SectionMessage from "./_components/SectionMessage.vue";
import SectionSpeakers from "./_components/SectionSpeaker.vue";
import SectionSponsors from "./_components/SectionSponsors.vue";
import SectionTimetable from "./_components/SectionTimetable.vue";

import {
  defineRouteRules,
  useI18n,
  // NOTE: import useHead to avoid `useHead is not defined` error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
  defineAsyncComponent,
} from "#imports";

defineRouteRules({ prerender: true });

const { t } = useI18n();

const SectionStaff = import.meta.vfFeatures.staff
  ? defineAsyncComponent(() => import("./_components/SectionStaff.vue"))
  : null;

useSeoMeta({ title: "" });
</script>

<template>
  <div id="pages-index">
    <div class="section-container">
      <SectionTimetable />
      <SectionSpeakers />
      <SectionEvent />
      <SectionAccess />
      <SectionSponsors />
      <SectionMessage />
      <SectionContact />
      <SectionStaff v-if="SectionStaff" />
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
