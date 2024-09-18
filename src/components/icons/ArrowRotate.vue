<template>
    <svg :class="_class" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24"><path fill="currentColor" d="M21 10.5c0 4.14-3.36 7.5-7.5 7.5H11v4l-7-6l7-6v4h2.5c1.93 0 3.5-1.57 3.5-3.5S15.43 7 13.5 7H6V3h7.5c4.14 0 7.5 3.36 7.5 7.5"/></svg>
</template> 
<script setup lang="ts">
  defineProps({
    _class: {type: String, required: true},
    width: {type: String, default: "1em"},
    height: {type: String, default: "1em"}
  })
</script>