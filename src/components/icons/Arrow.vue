<template>
    <svg :class="_class" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24"><path fill="currentColor" d="M20 9v6h-8v4.84L4.16 12L12 4.16V9z"/></svg>
</template>
  
<script setup lang="ts">
  defineProps({
    _class: {type: String, required: true},
    width: {type: String, default: "1em"},
    height: {type: String, default: "1em"}
  })
</script>