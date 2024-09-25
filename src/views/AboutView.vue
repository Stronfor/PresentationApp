<script setup lang="ts">
import emitter from "@/composables/eventEmitter.js"

import BoardComponent from "../modules/Tetris/components/BoardComponent.vue";

const HandlerEmit = (name: string, data: any) => emitter.emit(name, data)

</script>
<template>
  <div class="about">
    <h2 class="text-center mt-10 text-4xl font-bold">TETRIS</h2>
    <BoardComponent />
  </div>
</template>