<script setup lang="ts">
import HomeImages from "@/components/HomeImages.vue";

import Twitter_icon from "../components/icons/Twitter.vue";
import Instagram_icon from "../components/icons/Instagram.vue";
import Github_icon from "../components/icons/Github.vue";
import Linkedin_icon from "../components/icons/Linkedin.vue";

</script>

<template>
    <div class="flex items-center justify-between bg-[url('@/assets/img/Timoty.png')] bg-no-repeat bg-right-top h-[450px]">
      <div class="mt-28 lg:pr-14 lg:max-w-[70%] w-full">
        <h1 class="text-4xl font-bold sm:text-5xl tracking-tight mb-6">Software designer, founder,<br/> and amateur asteonaut.</h1>
        <p class="text-base leading-7 opacity-75 mb-6">
          I’m Spencer, a software designer and entrepreneur based in New York City. 
          I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.
        </p>
        <div class="flex space-x-4">
          <RouterLink class="group" to="/"><Twitter_icon _class="navlink_social" width="25px" height="20px"/></RouterLink>
          <RouterLink class="group" to="/"><Instagram_icon _class="navlink_social" width="25px" height="20px"/></RouterLink>
          <RouterLink class="group" to="/"><Github_icon _class="navlink_social" width="25px" height="20px"/></RouterLink>
          <RouterLink class="group" to="/"><Linkedin_icon _class="navlink_social" width="25px" height="20px"/></RouterLink>
        </div>
      </div>
    </div>
    <HomeImages />
</template>
