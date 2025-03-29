<!-- NOTE: Netlify で SSR が動いてるか確認する CSRP -->
<script>
let count = 1;
</script>

<script setup>
const countRef = ref(++count);
</script>

<template>ssr test! {{ countRef }}</template>
