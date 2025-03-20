<script setup lang="ts">
import { useI18n, useLocalePath } from "#imports";
import { VFButton } from "#components";
import type { MessageSchema } from "~~/i18n/message-schema";

const localePath = useLocalePath();
const { t } = useI18n<{ message: MessageSchema }>();
</script>

<template>
  <footer>
    <div class="sns-container">
      <VFButton icon link="https://x.com/vuefes" external>
        <img src="/images/icons/ic_x.svg" :alt="t('snsIconImageAlt.x')" />
      </VFButton>
      <VFButton
        icon
        link="https://www.youtube.com/channel/UC6KPwA1kZJtQYdlh8_2hxCA"
        external
      >
        <img
          src="/images/icons/ic_youtube.svg"
          :alt="t('snsIconImageAlt.youtube')"
        />
      </VFButton>
      <VFButton icon link="https://github.com/vuejs-jp" external>
        <img
          src="/images/icons/ic_github.svg"
          :alt="t('snsIconImageAlt.github')"
        />
      </VFButton>
      <VFButton icon link="https://note.com/vuejs_jp/m/mb35849fee631" external>
        <img src="/images/icons/ic_note.svg" :alt="t('snsIconImageAlt.note')" />
      </VFButton>
    </div>

    <div class="container">
      <img
        class="logo-image"
        src="/images/logo-primary-sub.svg"
        :alt="$t('logo.alt')"
      />

      <div class="links">
        <ul class="past-vuefes-links">
          <li>
            <NuxtLink to="https://vuefes.jp/2024" external target="_blank"
              >Vue Fes Japan 2024</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2023" external target="_blank"
              >Vue Fes Japan 2023</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2022" external target="_blank"
              >Vue Fes Japan Online 2022</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2020" external target="_blank"
              >Vue Fes Japan 2020</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2019" external target="_blank"
              >Vue Fes Japan 2019</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2018" external target="_blank"
              >Vue Fes Japan 2018</NuxtLink
            >
          </li>
        </ul>

        <ul class="other-links">
          <!-- TODO: -->
          <!-- <li>
            <NuxtLink to="#">関連イベント</NuxtLink>
          </li> -->
          <li>
            <NuxtLink :to="localePath('/privacy-policy')">{{
              t("privacyPolicy")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/code-of-conduct')">{{
              t("coc")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/tokusho')">{{
              t("transactions")
            }}</NuxtLink>
          </li>
        </ul>
      </div>

      <p class="text-caption">
        © 2018-2024 Vue.js Japan Users Group some rights reserved. <br />
        Vue.js artworks by Evan You is licensed under a Creative Commons
        Attribution 4.0 International License.
      </p>
    </div>
  </footer>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

footer {
  .sns-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;

    :deep(img) {
      width: 40px;
      height: 40px;
      @media (--mobile) {
        width: 24px;
        height: 24px;
      }
    }
  }

  .container {
    color: var(--color-primary-sub);
    background-color: var(--color-primary);
    border-radius: var(--radius-m);
    margin-top: 0.5rem;

    padding: 5rem;
    @media (--mobile) {
      padding: 3rem 2rem;
    }

    .links {
      margin-top: 2rem;

      display: flex;
      @media (--mobile) {
        flex-direction: column;
      }

      .past-vuefes-links,
      .other-links {
        width: 50%;
        @media (--mobile) {
          width: 100%;
        }
        :deep(a) {
          color: var(--color-primary-sub);
          text-decoration: none;
        }
      }
    }
  }
}
</style>
