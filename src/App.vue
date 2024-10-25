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

const changeColorMode = () => {
  mode.value === 'dark' ? (mode.value = 'light') : (mode.value = 'dark')
}

mode.value = mode.store.value;

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
    class="text-textDark bg-zinc100 dark:bg-black dark:text-textLight overflow-hidden"
  >
    <div
      class="w-full sm:max-w-[90%] m-auto sm:px-20 px-2 bg-zinc50 dark:bg-zinc900 shadow-sm"
    >
      <header class="h-20">
        <div class="flex items-center justify-end md:justify-between pt-6 mb-5">
          <div class="w-5"></div>
          <Navigation @click-on-menu="isHiddenPopup = !isHiddenPopup" />
          <button
            @click="changeColorMode"
            class="h-11 w-12 md:mr-10 rounded-full border-2 shadow-sm shadow-zinc300 dark:shadow-sm dark:shadow-zinc600 border-borderLight hover:bg-lightBg dark:border-borderDark dark:hover:bg-darkBg"
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
      <main>
        <RouterView />
      </main>
      <footer class="border-t border-zinc200 dark:border-zinc700 py-12">
        <div class="md:justify-between md:flex-row flex flex-col items-center">
          <menu class="flex gap-3 text-sm">
            <RouterLink class="navlink__normal" to="/about">About</RouterLink>
            <RouterLink class="navlink__normal" to="/projects">Projects</RouterLink>
            <RouterLink class="navlink__normal" to="/articles">Articles</RouterLink>
            <RouterLink class="navlink__normal" to="/uses">Uses</RouterLink>
          </menu>
          <span class="dark:text-zinc600 m-3 text-zinc400 text-sm font-extralight">© 2022 Sergii Kabaliuk. All rights reserved.</span>
        </div>
      </footer>
    </div>
    <Popup class="fixed w-full top-2 z-20"
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