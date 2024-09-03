<script setup lang="ts">
import emitter from "@/composables/eventEmitter.js"

import BoardComponent from "../modules/Tetris/components/BoardComponent.vue";

const HandlerEmit = (name: string, data: any) => emitter.emit(name, data)

</script>
<template>
  <div class="about">
    <h1 @click="HandlerEmit('xyu', {putin: 'XYULO'})">
      This is an about page
    </h1>
    <button class="border-2 border-zinc100" @click="HandlerEmit('once', {data: {zhopa: 'putina'}})">TEST FOR EMITTER ONCE</button>

    <BoardComponent />
  </div>
</template>