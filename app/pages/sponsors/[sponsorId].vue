<script setup lang="ts">
import { useLocaleRoute, useRoute } from "@typed-router";
import SponsorTag from "./_components/SponsorTag.vue";
import XIcon from "~icons/icons/ic_x";
import GithubIcon from "~icons/icons/ic_github";
import BlueskyIcon from "~icons/icons/ic_bluesky";
import { SPONSORS as JaSponsors } from "~~/i18n/ja/sponsors";
import { SPONSORS as EnSponsors } from "~~/i18n/en/sponsors";
import { computed, defineOgImage, definePageMeta, useI18n } from "#imports";
import { VFSection } from "#components";

definePageMeta({ prerender: true });

const route = useRoute("sponsors-sponsorId");
const { t, locale } = useI18n();
const localeRoute = useLocaleRoute();

const sponsors = computed(() => {
  const sponsorData = locale.value === "ja" ? JaSponsors : EnSponsors;
  return Object.entries(sponsorData).flatMap(([plan, planSponsors]) =>
    planSponsors.map(sponsor => ({ ...sponsor, plan })),
  );
});

const currentSponsor = computed(() =>
  sponsors.value.find(sponsor => sponsor.id === route.params.sponsorId),
);

defineOgImage({
  component: "OgSponsor",

  props: {
    name: () => currentSponsor.value?.name,
    logoImageUrl: () => currentSponsor.value?.logoImageUrl,
    plan: () => currentSponsor.value?.plan,
  },
});
</script>

<template>
  <div v-if="currentSponsor" id="pages-sponsor-detail">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Sponsor</h1>

    <VFSection :title="t('sponsors.details')">
      <div class="sponsor-images">
        <div class="image">
          <NuxtLink :to="currentSponsor.linkUrl" external target="_blank">
            <img :src="currentSponsor.logoImageUrl" :alt="currentSponsor.logoImageAlt">
          </NuxtLink>
        </div>
        <NuxtLink :to="currentSponsor.linkUrl" external target="_blank" style="text-decoration: none;">
          <h3 class="name">
            {{ currentSponsor.name }}
          </h3>
        </NuxtLink>
      </div>
      <div class="sponsor-tags">
        <SponsorTag :plan="currentSponsor.plan" />
      </div>
      <div class="sponsor-description">
        {{ currentSponsor.description }}
      </div>

      <div v-if="currentSponsor.session" class="sponsor-session">
        <hr />
        <div v-for="session in currentSponsor.session" :key="session.title" class="sponsor-speaker-item">
          <div class="session-speaker-image">
            <img :src="session.speaker.avatarUrl" :alt="session.speaker.title" loading="lazy" />
          </div>

          <div class="session-detail">
            <h4>{{ session.title }}</h4>
            <p>{{ session.overview }}</p>
          </div>

          <div class="speaker">
            <p class="speaker-affiliation">
              {{ session.speaker.affiliation }}<br v-if="session.speaker.affiliation && session.speaker.title" />
              {{ session.speaker.title }}
            </p>

            <div class="speaker-name">
              {{ session.speaker.name }}
            </div>

            <div class="speaker-socials">
              <NuxtLink
                v-if="session.speaker.socialUrls?.github"
                :to="session.speaker.socialUrls.github"
                external
                target="_blank"
              >
                <GithubIcon :aria-label="t('snsIconImageAlt.github')" role="img" />
              </NuxtLink>

              <NuxtLink
                v-if="session.speaker.socialUrls?.x"
                :to="session.speaker.socialUrls.x"
                external
                target="_blank"
              >
                <XIcon :aria-label="t('snsIconImageAlt.x')" role="img" />
              </NuxtLink>

              <NuxtLink
                v-if="session.speaker.socialUrls?.bluesky"
                :to="session.speaker.socialUrls.bluesky"
                external
                target="_blank"
              >
                <BlueskyIcon :aria-label="t('snsIconImageAlt.bluesky')" role="img" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="view-all-sponsors">
        <VFButton outlined :link="localeRoute({ name: 'sponsors' })">
          {{ t("back") }}
        </VFButton>
      </div>
    </VFSection>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-sponsor-detail{
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

  hr{
    margin: 0;
    border: solid 1px  var(--color-divider);
  }
}

.sponsor-images{
  display: grid;
  width: fit-content;
  margin: 0 auto;
  .name{
    margin-top: 1rem;
  }
}

.sponsor-tags{
  margin-top: 2rem;
  @media (--mobile){

    margin-top: 1.5rem;
  }
}
.sponsor-description{
  margin: 2rem 0;
  @media (--mobile){

    margin: 1.5rem 0;
  }
}

/* sponsor session */

.sponsor-session{
  display: grid;
  gap: 2rem 0;
  margin-top: 2rem;

}

.sponsor-speaker-item{
  display: grid;
  grid-template-columns: calc(180 / 832 * 100%) 1fr;
  grid-template-rows: repeat(2,auto);
  grid-template-areas: "image session" "image speaker";
  gap: 1rem 2rem;
  @media (--mobile){
    grid-template-columns: repeat(2,50%);
    grid-template-areas: "image speaker" "session session";
    gap: 1.5rem;
  }
}

.session-detail{
  grid-area: session;
  h4{
    margin: 0;
    font-size: 1.125rem;
    font-family: IBMPlexSansJP-Bold;
  }
  p{
    margin-top: 8px;
  }
}
.session-speaker-image{
  grid-area: image;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  img{
    width: 100%;
  }
}

.speaker{
  grid-area: speaker;
}
.speaker-affiliation{
  margin: 0;
  font-size: 11px;
  line-height: 1;
}
.speaker-name{
  margin-top: 4px;
}

.speaker-socials {
    display: flex;
    gap: 0.25rem;
    margin-top: 0.25rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--color-text-default);
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .view-all-sponsors{
    display: grid;
    place-items: center;
  }
</style>
