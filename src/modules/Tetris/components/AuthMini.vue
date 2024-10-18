<script setup lang="ts">
    import { useTetrisStore } from "../store/Tetris.strore";
    import { storeToRefs } from 'pinia'

    const TetrisStore = useTetrisStore();

    const { getPlayerStore } = storeToRefs(TetrisStore);

    const emits = defineEmits(["handelClick"])
    
    defineProps({
        Exit: {type: Function, required: true},
        isGameStarted: {type: Boolean, required: true}
    })
</script>
<template>
    <div>
      <button v-if="!getPlayerStore.name"
        class="absolute top-6 ml-2 h-12 w-24 rounded-full border-2 shadow-sm border-borderLight hover:bg-lightBg dark:border-borderDark dark:hover:bg-darkBg"
        @click="emits('handelClick')"
        :disabled="isGameStarted"
      >
        Enter
      </button>
      <section v-else class="absolute top-4 ml-2 p-2 h-18 w-48 rounded-2xl border-2 shadow-sm border-borderLight dark:border-borderDark">
        <div class="text-teal500">{{ getPlayerStore.name }}</div>
        <div class="flex justify-between justify-items-center">
          <div class="mt-1">Record: {{ getPlayerStore.record }}</div>
          <button
            class="py-1 px-3 hover:bg-zinc600 dark:hover:bg-zinc600 dark:bg-zinc700 bg-zinc800 transition rounded-md text-zinc100"
            @click="Exit()"
          >
            Exit
          </button>
        </div>
        
      </section>
    </div>
</template>