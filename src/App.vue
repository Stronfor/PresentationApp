<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Popup from "./components/Popup.vue";
import menuList from "./composables/menuList";

import { useColorMode } from "@vueuse/core";

import Light from "./components/icons/Light.vue";
import Dark from "./components/icons/Dark.vue";

const mode = useColorMode(); // Ref<'dark' | 'light'>

mode.value = "light";

const isHiddenPopup = ref(true);

const closePopupOutsideClick = (e: Event) => {
  if (!isHiddenPopup.value) {
    const target = e.target as HTMLElement;
    if (target.id === "popupWrapper") {
      isHiddenPopup.value = true;
    }
  }
};
</script>

<template>
  <div
    @click="closePopupOutsideClick"
    :class="{ dark: mode === 'dark' }"
    class="text-textDark bg-lightBg dark:bg-darkBg dark:text-textLight"
  >
    <div
      class="w-full sm:max-w-[1208px] mx-auto sm:px-20 bg-lightApp dark:bg-darkApp shadow-sm"
    >
      <header class="h-16">
        <div class="flex items-center justify-end md:justify-between pt-6 mb-5">
          <div class="w-5"></div>
          <Navigation @click-on-menu="isHiddenPopup = !isHiddenPopup" />
          <button
            @click="mode === 'dark' ? (mode = 'light') : (mode = 'dark')"
            class="h-11 w-12 md:mr-10 rounded-full border-2 border-borderLight hover:bg-lightBg dark:border-borderDark dark:hover:bg-darkBg"
          >
            <Light
              v-if="mode === 'light'"
              class="m-auto"
              color="gray"
              width="1.6em"
              height="1.6em"
            />
            <Dark
              v-else
              class="m-auto"
              color="#1fbbaa"
              width="1.6em"
              height="1.6em"
            />
          </button>
        </div>
      </header>
      <RouterView />
    </div>
    <Popup
      :class="{ hidden: isHiddenPopup }"
      @close-popup="isHiddenPopup = true"
      title="Navigation"
    >
      <nav class="flex items-middle flex-col mt-6">
        <RouterLink
          v-for="{ name, link } in menuList"
          :key="link"
          @click="isHiddenPopup = true"
          class="navlink__popup"
          :to="link"
        >
          {{ name }}
        </RouterLink>
      </nav>
    </Popup>
  </div>
</template>
