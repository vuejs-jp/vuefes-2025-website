<script setup lang="ts">
import { computed, onMounted } from "vue";

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
  width?: string;
  height?: string;
  aspectRatio?: string;
}>();

const fontColor = computed(() => {
  switch (userRole) {
    case "Attendee":
      return "#007f62";
    // TODO:
    default:
      return "";
  }
});

onMounted(() => {
  const previewRoot = document.querySelector(".namecard-preview");
  const cardWrapper = document.querySelector(".base-namecard-wrapper") as HTMLElement;
  const backface = cardWrapper.querySelector(".card-face-back") as HTMLElement;
  let rotationDegree = 0;

  previewRoot?.addEventListener("pointermove", (event) => {
    if (!cardWrapper) return;

    const { x, y } = event as PointerEvent;
    const bounds = cardWrapper.getBoundingClientRect();
    const pointerX = x - bounds.x;
    const pointerY = y - bounds.y;
    const ratioX = pointerX / bounds.width;
    const ratioY = pointerY / bounds.height;
    cardWrapper.style.setProperty("--ratio-x", `${ratioX}`);
    cardWrapper.style.setProperty("--ratio-y", `${ratioY}`);

    const posX = 50 + (ratioX - 0.5) * 28;
    const posY = 50 + (ratioY - 0.5) * 28;
    cardWrapper.style.setProperty("--posx", `${posX}%`);
    cardWrapper.style.setProperty("--posy", `${posY}%`);

    const mX = ratioX * 100;
    const mY = ratioY * 100;
    cardWrapper.style.setProperty("--mx", `${mX}%`);
    cardWrapper.style.setProperty("--my", `${mY}%`);

    const rX = (ratioX - 0.5) * -30;
    const rY = (ratioY - 0.5) * 50;
    cardWrapper.style.setProperty("--rx", `${rX}deg`);
    cardWrapper.style.setProperty("--ry", `${rY}deg`);
  });

  // flip
  cardWrapper.addEventListener("click", () => {
    cardWrapper.classList.add("flip-start");
    cardWrapper.classList.toggle("focused");

    // Hide highlight for 1.2 seconds
    const highlight = cardWrapper.querySelector(".highlight") as HTMLElement;
    const emboss = cardWrapper.querySelector(".emboss") as HTMLElement;

    if (highlight) {
      highlight.style.opacity = "0";
      emboss.style.opacity = "0";
      setTimeout(() => {
        highlight.style.opacity = "";
        emboss.style.opacity = "";
      }, 1200);
    }

    // flip with gradually slower speed
    const delays = [0, 500];

    const flipWithDelay = (index: number) => {
      if (index >= delays.length) {
        setTimeout(() => {
          cardWrapper.classList.remove("flip-start");
        }, 800); // Wait a bit after the last flip
        return;
      }

      setTimeout(() => {
        rotationDegree += 180;
        cardWrapper.style.setProperty("--rotation", `${rotationDegree}deg`);
        backface.style.setProperty("--rotation", `${rotationDegree}deg`);
        flipWithDelay(index + 1);
      }, delays[index]);
    };

    flipWithDelay(0);
  });
});
</script>

<template>
  <div class="namecard-preview">
    <div class="base-namecard-wrapper" :style="{ width, height, aspectRatio }">
      <img
        src="/images/namecard/default.png"
        alt="namecard"
        class="base-namecard card-face card-face-front"
        :style="{ width, height, aspectRatio, backfaceVisibility: 'hidden' }"
      />
      <div class="card-face highlight" :style="{ width, height, aspectRatio }" />
      <div class="card-face emboss" :style="{ width, height, aspectRatio }" />
      <div class="card-face card-face-back" :style="{ width, height, aspectRatio }" />

      <img v-if="avatarImageUrl" id="avatar-image" :src="avatarImageUrl" alt="avatar" />

      <div id="namecard-name" :style="{ color: fontColor }">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.namecard-preview {
  position: relative;
  #avatar-image {
    position: absolute;
    top: 57.6%;
    left: 50.7%;
    width: 45.0671936%;
    height: 31.7%;
    border-radius: 50%;
    backface-visibility: hidden;
  }

  #namecard-name {
    position: absolute;
    top: 31.38%;
    left: 4.13%;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    font-family: JetBrainsMono, IBMPlexSansJP;
    backface-visibility: hidden;
  }
}

.base-namecard-wrapper {
  transform-style: preserve-3d;
  perspective: 1000px;
  --rotation: 0deg;
  transform: rotateY(var(--rotation));
  transition: transform 0.6s;
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

  &.focused {
    transform: scale(1.7) rotateY(var(--rotation));

    @media (hover: hover) {
      &:hover:not(.flip-start) {
        transform: scale(1.7) rotateY(var(--rotation)) rotateX(var(--rx)) rotateY(var(--ry));
      }
    }
  }

  @media (hover: hover) {
    &:hover:not(.flip-start) {
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
      transition: transform 0.1s, box-shadow 0.3s;
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
  border-radius: 4.5% / 3.5%;
  height: 100%;
  position: absolute;
  width: 100%;
  width: 20vw;
  perspective: 1000px;
  transform-style: preserve-3d;
}
</style>
