<template>
    <svg :class="_class" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M19.5 14.598c2-1.155 2-4.041 0-5.196l-9-5.196C8.5 3.05 6 4.494 6 6.804v10.392c0 2.31 2.5 3.753 4.5 2.598z" clip-rule="evenodd"/></svg>
</template> 
<script setup lang="ts">
  defineProps({
    _class: {type: String, required: true},
    width: {type: String, default: "1em"},
    height: {type: String, default: "1em"}
  })
</script>