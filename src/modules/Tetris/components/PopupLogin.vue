<script setup lang="ts">

defineProps({
    title: {type: String, default: "title"}
})
const emits = defineEmits(["close-popup"])
</script>
<template>
    <div class="flex justify-center">
        <div id="popupLoginWrapper" class="fixed inset-0 backdrop-blur-sm bg-borderDark/40 dark:bg-borderDark/95"></div>
        <div id="popup" class="absolute top-0 mt-10 p-5 rounded-[1.5rem] w-[95%] bg-lightBg dark:bg-darkApp dark:text-textLight">
            <div class="flex justify-between">
                <span class="mx-3">{{ title }}</span>
                <button @click="emits('close-popup')">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 text-zinc-500 dark:text-zinc-400">
                        <path d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </div>
            <slot />
        </div>
    </div>
</template>
<style scoped>
#popupWrapper {
    transition: 1s;
    animation: growe .1s forwards;
}

#popup{
  animation: growe .15s forwards;
}

@keyframes growe {
    from {
        scale: 0
    }
    to {
        scale: 1
    }
}
</style>