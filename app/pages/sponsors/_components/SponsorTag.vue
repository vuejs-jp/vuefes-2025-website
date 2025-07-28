<script setup lang="ts">
defineProps({
  plan: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span :class="`sponsor-tag sponsor-tag--${plan.toLowerCase()}`">
    {{ $t(`sponsors.${plan}Sponsor`) }}
  </span>
</template>

<style scoped>
.sponsor-tag {
  display: inline flex;
  align-items: center;
  padding: 0 8px;
  height: 36px;
  border-radius: 8px;
}

.sponsor-tag--platina {
background: linear-gradient(270deg, #EEEEEE 0%, #C6C6C6 25%, #EEEEEE 50%, #EEEEEE 75%, #C6C6C6 100%);

}

.sponsor-tag--gold {
background: #DBD69A;
}

.sponsor-tag--silver {

background: #E2E4EC;

}

.sponsor-tag--bronze {

background: #DDA25B;

}

.sponsor-tag--option {

background: #FAE8E4;

}
</style>
