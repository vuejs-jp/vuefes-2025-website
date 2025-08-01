<script setup lang="ts">
import SectionVolunteer from "./_components/SectionVolunteer.vue";
import SectionSpeakers from "./_components/SectionSpeaker.vue";
import SectionStudentSupport from "./_components/SectionStudentSupport.vue";
import SectionMessage from "./_components/SectionMessage.vue";
import SectionSponsorWanted from "./_components/SectionSponsorWanted.vue";
// import SectionSponsors from "./_components/SectionSponsors.vue";
import SectionContact from "./_components/SectionContact.vue";
import SectionAccess from "./_components/SectionAccess.vue";

import {
  defineAsyncComponent,
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

let SectionSponsors: ReturnType<typeof defineAsyncComponent> | null = null;
if (__FEATURE_SPONSOR_LIST__) {
  SectionSponsors = defineAsyncComponent(() => import("~/pages/_components/SectionSponsors.vue"));
}
let SectionGetYourTicket: typeof import("./_components/SectionGetYourTicket.vue").default | null = null;
if (__FEATURE_TICKET_NAME_BADGE__) {
  SectionGetYourTicket = defineAsyncComponent(() => import("./_components/SectionGetYourTicket.vue"));
}
</script>

<template>
  <div id="pages-index">
    <div class="section-container">
      <SectionGetYourTicket v-if="SectionGetYourTicket" />
      <SectionSpeakers />
      <component :is="SectionStudentSupport" v-if="SectionStudentSupport" />
      <SectionVolunteer />
      <SectionSponsors v-if="SectionSponsors" />
      <SectionSponsorWanted />
      <SectionAccess />
      <SectionMessage />
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
