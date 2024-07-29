<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useWindowSize } from "@vueuse/core";

import menuList from "@/composables/menuList";

const { width, height } = useWindowSize();

const emit = defineEmits(["click-on-menu"]);
</script>
<template>
  <nav
    v-if="width > 768"
    class="border-2 border-borderLight rounded-3xl mx-3 py-2 px-4 dark:bg-[#252529] dark:border-borderDark"
  >
    <RouterLink
      v-for="{ name, link } in menuList"
      :key="name"
      class="navlink__normal"
      :to="link"
      >{{ name }}</RouterLink
    >
  </nav>
  <nav v-else>
    <button
      @click="emit('click-on-menu')"
      class="h-12 w-24 mr-3 rounded-full border-2 border-borderLight hover:bg-lightBg dark:border-borderDark dark:hover:bg-darkBg flex justify-center items-center"
    >
      <span>Menu</span>
      <span>
        <svg
          viewBox="0 0 8 6"
          aria-hidden="true"
          class="ml-3 h-auto w-2 stroke-textDark group-hover:stroke-zinc-700 dark:stroke-textLight"
        >
          <path
            d="M1.75 1.75 4 4.25l2.25-2.5"
            fill="none"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>
    </button>
  </nav>
</template>
