<template>
    <svg :class="_class" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24"><g fill="none"><circle cx="12" cy="12" r="9" fill="currentColor" opacity=".16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3a9 9 0 1 1-5.657 2"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4.5h4v4"/></g></svg>
</template> 
<script setup lang="ts">
  defineProps({
    _class: {type: String, required: true},
    width: {type: String, default: "1em"},
    height: {type: String, default: "1em"}
  })
</script>