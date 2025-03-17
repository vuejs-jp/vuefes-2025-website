<script setup lang="ts">
import MainVisualGraphic from "./MainVisualGraphic.vue";
</script>

<template>
  <section class="main-visual">
    <h1 class="main-visual-head">
      <span class="site-title site-title-en" lang="en">
        <span>Vue Fes</span>
        <span>Japan 2025</span>
      </span>
      <span class="site-title site-title-ja" lang="ja">
        <span>ビューフェス</span>
        <span>ジャパン2025</span>
      </span>
    </h1>

    <div class="main-visual-body">
      <time datetime="2025-10-25" class="lang-en" lang="en"
        >OCTOBER 25, 2025</time
      >
      <!-- TODO: appearance -->
      <MainVisualGraphic appearance="svg" class="main-visual-graphic" />
      <time datetime="2025-10-25" class="lang-ja" lang="ja"
        >2025年10月25日</time
      >
    </div>

    <div class="main-visual-foot">
      <div class="lang-en" lang="en">
        <span>Otemachi</span>
        <span>Place Hall & Conference</span>
      </div>

      <div class="lang-ja" lang="ja">
        <span>大手町</span>
        <span>プレイス ホール &</span>
        <span>カンファレンス</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.main-visual {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
  height: 100svh;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;

  @media (--mobile) {
    padding: 16px;
  }

  .main-visual-head {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;

    @media (--mobile) {
      padding: 2px 4px;
    }

    .site-title {
      display: flex;
      flex-direction: column;
      * {
        font-family: ClashDisplay-SemiBold, IBMPlexSansJP-SemiBold;
        line-height: inherit;
        font-size: inherit;
        font-feature-settings: "palt";

        @media (--mobile) {
          font-size: 1.5rem;
        }
      }
    }

    .site-title-en {
      font-size: 3rem;
      line-height: 0.9;
      letter-spacing: -0.02em;
      text-align: left;

      @media (--mobile) {
        letter-spacing: -0.01em;
      }
    }

    .site-title-ja {
      font-size: 2.5rem;
      line-height: 1.1;
      text-align: right;

      @media (--mobile) {
        * {
          font-size: 1.25rem;
        }
      }
    }
  }

  .main-visual-body {
    grid-column: 1 / -1;
    grid-row: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (--mobile) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 309fr auto 271fr;
      justify-content: center;
    }

    .lang-en {
      flex-basis: 25%;
      flex-shrink: 0;
      font-family: JetBrainsMono-Regular;
      font-size: 1.25rem;
      text-align: left;

      @media (--mobile) {
        grid-row: 1;
        text-align: center;
        padding-top: 20px;
        font-size: 0.875rem;
      }
    }

    .main-visual-graphic {
      flex-basis: 50%;
      flex-shrink: 1;
      max-width: 640px;
      min-width: 1px;

      @media (--mobile) {
        grid-row: 2;
        width: 72%;
        margin: 0 auto;
      }
    }

    .lang-ja {
      flex-basis: 25%;
      flex-shrink: 0;
      font-family: JetBrainsMono-Regular;
      font-size: 1.25rem;
      text-align: right;

      @media (--mobile) {
        grid-row: 3;
        text-align: center;
        font-size: 0.875rem;
      }
    }
  }

  .main-visual-foot {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (--mobile) {
      align-items: center;
    }

    .lang-en {
      * {
        font-size: 1.5rem;
        line-height: 1.2;
        letter-spacing: -0.02em;
        text-align: left;
        display: flex;
        flex-direction: column;

        @media (--mobile) {
          max-width: 176px;
          font-size: 1rem;
        }
      }
    }

    .lang-ja {
      * {
        font-family: IBMPlexSansJP-Medium;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.2;
        letter-spacing: -0.02em;
        text-align: right;
        display: flex;
        flex-direction: column;

        @media (--mobile) {
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>
