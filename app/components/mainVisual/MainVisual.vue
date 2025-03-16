<script setup lang="ts">
import MainVisualGraphic from "./MainVisualGraphic.vue";
</script>

<template>
  <div class="main-visual">
    <div class="main-visual-head">
      <div class="site-title site-title-en">
        <div>Vue Fes</div>
        <div>Japan 2025</div>
      </div>
      <div class="site-title site-title-ja">
        <div>ビューフェス</div>
        <div>ジャパン 2025</div>
      </div>
    </div>

    <div class="main-visual-body">
      <div class="lang-en">OCTOBER 25, 2025</div>
      <!-- TODO: appearance -->
      <MainVisualGraphic appearance="svg" class="main-visual-graphic" />
      <div class="lang-ja">2025年10月25日</div>
    </div>

    <div class="main-visual-foot">
      <div class="lang-en">
        <div>Otemachi</div>
        <div>Place Hall & Conference</div>
      </div>

      <div class="lang-ja">
        <div>大手町</div>
        <div>プレイス ホール &</div>
        <div>カンファレンス</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.main-visual {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  width: 100vw;
  padding: 24px;
  box-sizing: border-box;

  .main-visual-head {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;

    .site-title {
      * {
        font-family: ClashDisplay-SemiBold, IBMPlexSansJP-SemiBold;
        font-size: 3rem;
        line-height: 1.2;
        @media (--mobile) {
          font-size: 1.5rem;
        }
      }
    }

    .site-title-en {
      text-align: left;
    }

    .site-title-ja {
      text-align: right;
    }
  }

  .main-visual-body {
    grid-column: 1 / -1;
    grid-row: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .lang-en {
      text-align: left;
    }

    .main-visual-graphic {
      width: 50%;
      max-width: 600px;
    }

    .lang-ja {
      text-align: right;
    }

    @media (--mobile) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto 1fr;
      justify-content: center;

      .lang-en {
        grid-row: 1;
        text-align: center;
      }

      .main-visual-graphic {
        grid-row: 2;
        width: 66%;
        margin: 0 auto;
      }

      .lang-ja {
        grid-row: 3;
        text-align: center;
      }
    }
  }

  .main-visual-foot {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .lang-en {
      text-align: left;
    }

    .lang-ja {
      text-align: right;
    }
  }
}
</style>
