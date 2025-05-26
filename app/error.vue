<script setup lang="ts">
import { navigateTo, useLocaleRoute } from "@typed-router";
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const localeRoute = useLocaleRoute();

if (props.error.statusCode === 404) {
  navigateTo(localeRoute({ name: "index" }), { replace: true });
}
</script>
