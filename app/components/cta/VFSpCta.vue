<script setup lang="ts">
import { ref } from "vue";
import SpCtaMobileButton from "./VFSpCtaMobileButton.vue";
import { VFCta } from "#components";

const { openerText } = defineProps<{
  openerText: string;
}>();

const isOpened = ref(false);

function toggleMenu(toggle = !isOpened.value) {
  isOpened.value = toggle;
}
</script>

<template>
  <div class="sp-cta-wrapper" lang="en">
    <Transition enter-active-class="zoom-blur-in" leave-active-class="zoom-blur-in-reverse">
      <div v-if="isOpened" class="sp-cta-content">
        <VFCta :is-bg="false">
          <slot />
        </VFCta>
      </div>
    </Transition>

    <SpCtaMobileButton
      v-click-outside="toggleMenu"
      class="cta-button-mobile"
      :is-opened
      :opener-text="openerText"
      @click="toggleMenu"
    />
  </div>
</template>

<style scoped>
.sp-cta-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sp-cta-content {
  position: fixed;
  bottom: 85px;
  left: 0;
  right: 0;
  background: var(--color-white-transparent);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  max-width: 240px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid var(--color-divider-light);
}

.cta-button-mobile {
  margin: 0.5rem auto 0 auto;
}

@keyframes zoomBlurIn {
  /* 0% = small with strong blur and transparent */
  0% {
    transform: scale(1, 0.8);
    filter: blur(12px);
    backdrop-filter: blur(0);
    opacity: 0;
  }

  /* Around 60% = almost full scale, almost clear but still slightly blurred */
  60% {
    transform: scale(1);
    filter: blur(1px);
    backdrop-filter: blur(1px);
    opacity: 1;
  }

  /* 100% = full scale and clear */
  100% {
    transform: scale(1);
    filter: blur(0);
    backdrop-filter: blur(20px);
    opacity: 1;
  }
}

/* Class to apply the animation */
.zoom-blur-in {
  animation: zoomBlurIn 0.3s cubic-bezier(.25,.8,.25,1) both;
  /* both = forwards+backwards so initial state is affected by 0% */
}

@keyframes zoomBlurOut {
  0%   { transform: scale(1);   filter: blur(0);    backdrop-filter: blur(8px); opacity: 1; }
  100% { transform: scale(0.8); filter: blur(12px); backdrop-filter: blur(0);   opacity: 0; }
}

.zoom-blur-in-reverse {
  animation: zoomBlurOut 0.2s cubic-bezier(.4,.0,.6,1) both;
}
</style>
