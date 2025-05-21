<script setup lang="ts">
import { ref } from "vue";
import { NAV_ITEMS } from "./constant";
import MenuItem from "./VFMenuItem.vue";
import SpMenuMobileButton from "./VFSpMenuMobileButton.vue";

const menuOpen = ref(false);

function toggleMenu(toggle = !menuOpen.value) {
  menuOpen.value = toggle;
}
</script>

<template>
  <div class="sp-navigation-wrapper" lang="en">
    <Transition enter-active-class="zoom-blur-in" leave-active-class="zoom-blur-in-reverse">
      <ul v-if="menuOpen" v-show="menuOpen" class="sp-navigation-content">
        <li v-for="(item, idx) in NAV_ITEMS" :key="idx">
          <MenuItem class="sp-navigation-link" :label="item.label" :href="item.href" />
        </li>
      </ul>
    </Transition>

    <SpMenuMobileButton
      v-click-outside="toggleMenu"
      class="navigation-button-mobile"
      :is-opened="menuOpen"
      @click="toggleMenu"
    />
  </div>
</template>

<style scoped>
.sp-navigation-wrapper {
  display: flex;
  min-width: 15rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sp-navigation-content {
  position: absolute;
  bottom: 95%;
  width: auto;
  max-width: 15rem;
  background: var(--color-white-transparent);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid var(--color-divider-light);
  padding: 0.5rem 0.1rem;
  margin: 0 auto;
}

.sp-navigation-link {
  font-weight: 700;
}

.sp-navigation-content li {
  list-style: none;
  padding: 0.7rem 2rem;
}

.navigation-button-mobile {
  margin: 1rem auto 0 auto;
}

@keyframes zoomBlurIn {
  /* 0% = 小さくて強いぼかし・透明 */
  0% {
    transform: scale(1, 0.8);
    filter: blur(12px);
    backdrop-filter: blur(0);
    opacity: 0;
  }

  /* 60% くらいでほぼ等倍・ほぼ無色透明だがまだ少しぼかす */
  60% {
    transform: scale(1);
    filter: blur(1px);
    backdrop-filter: blur(1px);
    opacity: 1;
  }

  /* 100% = 完全等倍・くっきり */
  100% {
    transform: scale(1);
    filter: blur(0);
    backdrop-filter: blur(8px);
    opacity: 1;
  }
}

/* アニメーションを付けたいクラス */
.zoom-blur-in {
  animation: zoomBlurIn 0.3s cubic-bezier(.25,.8,.25,1) both;
  /* both = forwards+backwards なので初期状態も 0% が効く */
}

@keyframes zoomBlurOut {
  0%   { transform: scale(1);   filter: blur(0);    backdrop-filter: blur(8px); opacity: 1; }
  100% { transform: scale(0.8); filter: blur(12px); backdrop-filter: blur(0);   opacity: 0; }
}

.zoom-blur-in-reverse {
  animation: zoomBlurOut 0.2s cubic-bezier(.4,.0,.6,1) both;
}
</style>
