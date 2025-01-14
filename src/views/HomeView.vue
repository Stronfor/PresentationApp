<script setup lang="ts">
import HomeImages from "@/components/HomeImages.vue";
import PostPreview from "@/components/PostPreview.vue";

import Twitter_icon from "../components/icons/TwitterIcon.vue";
import Instagram_icon from "../components/icons/InstagramIcon.vue";
import Github_icon from "../components/icons/GithubIcon.vue";
import Linkedin_icon from "../components/icons/LinkedinIcon.vue";

</script>

<template>
  <div class="bg-zinc50 dark:bg-zinc900 pb-10">
    <div class="flex items-center justify-between h-[450px]">
      <div class="mt-28 lg:pr-14 lg:max-w-[70%] w-full z-10 dark:bg-opacity-0 bg-zinc50 lg:bg-opacity-0 rounded-md bg-opacity-45">
        <h1 class="text-4xl font-bold sm:text-5xl tracking-tight mb-6">Software engineer, designer<br/> and 3D printing enthusiast</h1>
        <p class="text-base leading-7 mb-6">
          I’m Sergio, a software  engineer with more than four years of experience from Italy.<br/>
          I`m a developer of modern modular, adaptive applications with the latest architectural approaches to development.
        </p>
        <div class="flex space-x-4">
          <a class="group" target="_blank" href="https://www.x.com"><Twitter_icon _class="navlink_social" width="25px" height="20px"/></a>
          <a class="group" target="_blank" href="https://www.instagram.com"><Instagram_icon _class="navlink_social" width="25px" height="20px"/></a>
          <a class="group" target="_blank" href="https://github.com/Stronfor/"><Github_icon _class="navlink_social" width="25px" height="20px"/></a>
          <a class="group" target="_blank" href="https://www.linkedin.com/in/sergio-kabaliuk-12b707226/"><Linkedin_icon _class="navlink_social" width="25px" height="20px"/></a>
        </div>
      </div>
      <img class="absolute top-20 right-[5%] z-0" src="@/assets/img/Main.png"  width="500" alt="Sergio">
    </div>
    <HomeImages />
    <div class="mt-24">
      <PostPreview />
    </div>
  </div>
</template>
