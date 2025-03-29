<script>
let count = 1;
</script>

<script setup>
const countRef = ref(++count);
</script>

<template>ssr test! {{ countRef }}</template>
