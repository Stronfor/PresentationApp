<template>
    <svg :class="_class" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" d="M5 7a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zm9 0a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2z"/></svg>
</template> 
<script setup lang="ts">
  defineProps({
    _class: {type: String, required: true},
    width: {type: String, default: "1em"},
    height: {type: String, default: "1em"}
  })
</script>