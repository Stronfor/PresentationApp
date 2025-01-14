<script setup lang="ts">
import { type PropType } from "vue";
import PlayersIcon from "@/components/icons/PlayersIcon.vue";

defineProps({
  BestPlayers: {type: Array as PropType<{ name: string; record: number }[]>,required: true},
});
</script>
<template>
  <div
    class="border border-zinc200 dark:border-zinc800 rounded-2xl p-10 max-h-80 mb-10"
  >
    <div class="flex gap-3">
      <PlayersIcon _class="text-zinc500" width="32" height="32" />
      <h4 class="text-2xl font-semibold mb-5">Best players</h4>
    </div>
    <div
      v-for="{ name, record } in BestPlayers"
      :key="name"
      class="flex justify-between items-center"
    >
      <p class="text-xl leading-10 text-hoverText">{{ name }}:</p>
      <span class="text-zinc500">{{ record }}</span>
    </div>
  </div>
</template>
