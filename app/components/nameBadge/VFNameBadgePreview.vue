<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watchEffect } from "vue";

const {
  name,
  userRole,
  avatarImageUrl,
  width,
  height,
  aspectRatio,
} = defineProps<{
  userRole: "Attendee" | "Attendee+Party" | "Sponsor" | "Speaker" | "Staff";
  name: string;
  avatarImageUrl?: string;

  /** only for userRole = "Staff" */
  lang?: string;

  width?: string;
  height?: string;
  aspectRatio?: string;
}>();

const variants = computed(() => {
  switch (userRole) {
    case "Attendee+Party":
      return {
        color: "#007f62",
        baseImageUrl: "/images/name-badge/party.png",
        avatarPlaceholderImageUrl: "/images/name-badge/party-avatar.png",
      };
    case "Sponsor":
      return {
        color: "#f66c21",
        baseImageUrl: "/images/name-badge/sponsor.png",
        avatarPlaceholderImageUrl: "/images/name-badge/sponsor-avatar.png",
      };
    case "Speaker":
      return {
        color: "#8314d3",
        baseImageUrl: "/images/name-badge/speaker.png",
        avatarPlaceholderImageUrl: "/images/name-badge/speaker-avatar.png",
      };
    case "Staff":
      return {
        color: "#ffffff",
        baseImageUrl: "/images/name-badge/staff.png",
        avatarPlaceholderImageUrl: "/images/name-badge/staff-avatar.png",
      };
    case "Attendee":
    default:
      return {
        color: "#385FCC",
        baseImageUrl: "/images/name-badge/default.png",
        avatarPlaceholderImageUrl: "/images/name-badge/default-avatar.png",
      };
  }
});

// const isSafari = ref(false);
const isTouchDevice = ref(false);
const isFocused = ref(false);
const isHovering = ref(false);

const cardOuter = useTemplateRef<HTMLElement | null>("cardOuter");
const cardWrapper = useTemplateRef<HTMLElement | null>("cardWrapper");

function focus() {
  if (isTouchDevice.value) return;
  isFocused.value = true;
}

function unfocus() {
  if (isTouchDevice.value) return;
  isFocused.value = false;
}

const ratioX = ref(0);
const ratioY = ref(0);
const posX = ref(0);
const posY = ref(0);
const mx = ref(0);
const my = ref(0);
const rx = ref(0);
const ry = ref(0);

function reset() {
  ratioX.value = 0;
  ratioY.value = 0;
  posX.value = 0;
  posY.value = 0;
  mx.value = 0;
}

onMounted(() => {
  // isSafari.value = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (window.matchMedia("(hover: none)").matches) {
    isTouchDevice.value = true;
  }

  // const backface = cardWrapper.querySelector(".card-face-back") as HTMLElement;
  // const rotationDegree = 0;

  watchEffect(() => {
    if (!cardWrapper.value) return;
    if (isFocused.value) {
      cardWrapper.value.classList.add("focused");
    } else {
      cardWrapper.value.classList.remove("focused");
    }
  });

  cardOuter.value!.addEventListener("pointerleave", () => {
    if (isFocused.value) return;
    isHovering.value = false;
    reset();
  });

  cardOuter.value!.addEventListener("pointermove", (event) => {
    if (isTouchDevice.value) return;
    if (!cardWrapper.value) return;

    isHovering.value = true;
    const { x, y } = event as PointerEvent;
    const bounds = cardWrapper.value.getBoundingClientRect();
    const pointerX = x - bounds.x;
    const pointerY = y - bounds.y;
    ratioX.value = pointerX / bounds.width;
    ratioY.value = pointerY / bounds.height;

    posX.value = 50 + (ratioX.value - 0.5) * 28;
    posY.value = 50 + (ratioY.value - 0.5) * 28;

    mx.value = ratioX.value * 100;
    my.value = ratioY.value * 100;

    rx.value = (ratioX.value - 0.5) * -30;
    ry.value = (ratioY.value - 0.5) * 50;
  });

  // Zoom
  cardWrapper.value!.addEventListener("click", () => {
    if (isTouchDevice.value) return;

    if (isFocused.value) {
      unfocus();
    } else {
      focus();
    }

    // cardWrapper.classList.add("flip-start");

    // Hide highlight for 1.2 seconds
    // const highlight = cardWrapper.querySelector(".highlight") as HTMLElement;
    // const emboss = cardWrapper.querySelector(".emboss") as HTMLElement;

    // if (highlight) {
    //   highlight.style.opacity = "0";
    //   emboss.style.opacity = "0";
    //   setTimeout(() => {
    //     highlight.style.opacity = "";
    //     emboss.style.opacity = "";
    //   }, 1200);
    // }

    // // flip with gradually slower speed
    // const delays = [0, 500];

    // const flipWithDelay = (index: number) => {
    //   if (index >= delays.length) {
    //     setTimeout(() => {
    //       cardWrapper.classList.remove("flip-start");
    //     }, 800); // Wait a bit after the last flip
    //     return;
    //   }

    //   setTimeout(() => {
    //     rotationDegree += 180;
    //     cardWrapper.style.setProperty("--rotation", `${rotationDegree}deg`);
    //     backface.style.setProperty("--rotation", `${rotationDegree}deg`);
    //     flipWithDelay(index + 1);
    //   }, delays[index]);
    // };

    // flipWithDelay(0);
  });
});
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
  <div
    class="name-badge-preview-background"
    :class="{ focused: isFocused }"
    @click="unfocus"
    @keydown.esc.prevent="unfocus"
  />
  <div
    ref="cardOuter"
    class="name-badge-preview-outer"
    :class="{ focused: isFocused }"
  >
    <div class="name-badge-preview" :class="{ focused: isFocused }">
      <div
        ref="cardWrapper" class="base-name-badge-wrapper"
        :class="{ hovering: isHovering || isFocused }"
        :style="{
          width,
          height,
          aspectRatio,
          '--ratio-x': ratioX,
          '--ratio-y': ratioY,
          '--posx': `${posX}%`,
          '--posy': `${posY}%`,
          '--mx': `${mx}%`,
          '--my': `${my}%`,
          '--rx': `${rx}deg`,
          '--ry': `${ry}deg`,
        }"
      >
        <img
          :src="variants.baseImageUrl"
          alt="Name Badge Preview"
          class="base-name-badge card-face card-face-front"
          :style="{
            width,
            height,
            aspectRatio,
            backfaceVisibility: 'hidden',
          }"
        />
        <div class="card-face highlight" :style="{ width, height, aspectRatio }" />
        <div class="card-face emboss" :style="{ width, height, aspectRatio }" />
        <div class="card-face card-face-back" :style="{ width, height, aspectRatio }" />

        <img
          id="avatar-image"
          :src="avatarImageUrl ?? variants.avatarPlaceholderImageUrl"
          alt="avatar"
          :style="{
            ...(userRole === 'Sponsor'
              ? { objectFit: 'contain', backgroundColor: '#fff' }
              : {}
            ),
          }"
        />

        <div id="name-badge-name" :style="{ color: variants.color }">
          {{ name }}
        </div>

        <div v-if="userRole==='Staff' && lang" id="name-badge-lang" :style="{ color: variants.color }">
          {{ lang }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.name-badge-preview-background {
  opacity: 0;
  pointer-events: none;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0002;
  backdrop-filter: blur(1px);
  transition: opacity 0.3s;

  &.focused {
    opacity: 1;
    pointer-events: auto;
  }
}

.name-badge-preview-outer {
  padding: 1rem;
  transition: transform 0.3s;

  &.focused {
    z-index: 2000;
    transform: scale(1.7);
  }
}

.name-badge-preview {
  position: relative;
  user-select: none;

  #avatar-image {
    position: absolute;
    top: 57.6%;
    left: 50.7%;
    width: 45.0671936%;
    height: 31.7%;
    border-radius: 50%;
    backface-visibility: hidden;
    user-select: none;
  }

  #name-badge-name {
    position: absolute;
    top: 31.38%;
    left: 4.13%;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    font-family: JetBrainsMono-Regular, IBMPlexSansJP-Regular;
    backface-visibility: hidden;
    user-select: none;
  }

  #name-badge-lang {
    position: absolute;
    top: 47.5%;
    left: 70%;
    font-size: 1rem;
    font-weight: normal;
    color: #333;
    font-family: JetBrainsMono-Regular, IBMPlexSansJP-Regular;
    backface-visibility: hidden;
    user-select: none;
  }
}

.base-name-badge-wrapper {
  transform-style: preserve-3d;
  perspective: 1000px;
  --rotation: 0deg;
  transform: rotateY(var(--rotation));
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 1rem;

  .highlight {
    border-radius: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }

  .emboss {
    position: absolute;
    top: 0;
    left: 0;
    clip-path: inset(0.75% 1% round 0.75rem);
    mix-blend-mode: color-dodge;
    display: grid;
  }

  &.hovering:not(.flip-start) {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    transform: rotateY(var(--rotation)) rotateX(var(--rx)) rotateY(var(--ry));
    translate: calc((var(--ratio-x) - 0.5) * -5%) calc((var(--ratio-y) - 0.5) * -5%);

    & > .highlight {
      background: radial-gradient(
        circle at var(--mx) var(--my),
        rgba(255, 255, 255, 0.1) 10%,
        rgba(255, 255, 255, 0.1) 20%,
        rgba(0, 0, 0, 0.1) 90%
      );
      mix-blend-mode: overlay;
      transform: rotateX(calc(var(--rx) * -0.2)) rotateY(calc(var(--ry) * -0.2));
    }

    & > .emboss {
      background-blend-mode: exclusion, darken, color-dodge;
      background-size: 400% 400%, 210% 210%, 210% 210%;
      background-position:
        calc(((var(--posx) - 50%) * -2.5) + 50%) calc(((var(--posy) - 50%) * -2.5) + 50%),
        calc(((var(--posx) - 50%) * 1.5) + 50%) calc(((var(--posy) - 50%) * 1.5) + 50%),
        calc(((var(--posx) - 50%) * 1.5) + 50%) calc(((var(--posy) - 50%) * 1.5) + 50%);
      filter: brightness(.95) contrast(4) saturate(0.75);

      &::before {
        content: "";
        z-index: 2;
        grid-area: 1/1;
        background-image: radial-gradient(
          farthest-corner ellipse at calc(((var(--mx)) * 0.5) + 25%) calc(((var(--my)) * 0.5) + 25%),
          rgba(100, 100, 100, .1) 5%,
          rgba(50, 50, 50, .1) 15%,
          /* rgba(100, 100, 100, .5) 5%,
          rgba(50, 50, 50, .4) 15%,  */
          rgba(0, 0, 0, .6) 30%
        );
        background-position: center;
        background-size: 350% 350%;
        mix-blend-mode: multiply;
      }

      &::after {
        content: "";
        grid-area: 1/1;
        opacity: 0.1;
        background-image: url("~/assets/images/noise/1.png");
        background-color: var(--color-sub);
        background-repeat: repeat;
        background-size: 25% 25%, 400% 100%;
        background-position:
          center,
          calc(((var(--posx) - 50%) * -2.5) + 50%) calc(((var(--posy) - 50%) * -2.5) + 50%);
        filter: brightness(1) contrast(1) saturate(0);
        mix-blend-mode: soft-light;
        background-blend-mode: multiply;
      }
    }
  }

  .card-face-back {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    transform: rotateY(calc(var(--rotation) + 180deg));
    backface-visibility: hidden;
    background: white;
    border: #ddd solid 2px;
    transition: transform 0.6s;
  }
}

.card-face {
  height: 100%;
  position: absolute;
  width: 100%;
  width: 20vw;
  perspective: 1000px;
  transform-style: preserve-3d;
}
</style>
