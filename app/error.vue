<script setup lang="ts">
import { navigateTo, type NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

if (props.error.statusCode === 404) {
  navigateTo("/");
}
</script>
