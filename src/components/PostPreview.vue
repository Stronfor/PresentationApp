<script setup lang="ts">
import PostPreview from "../../public/posts/postsPreview"
import MyJobs from "../../public/posts/MyJobs"

import LetterIcon from "@/components/icons/LetterIcon.vue"
import PortfolioIcon from "@/components/icons/PortfolioIcon.vue"
import xp_work from "@/components/icons/xp_work.vue";

</script>

<template>
    <div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
        <div class="flex flex-col gap-12">
            <RouterLink :to="`post/${id}`" 
                v-for="{ id, date, title, preview } of PostPreview" 
                :key="id"
            >
                <article class="p-4 pt-6 pb-6 rounded-2xl hover:bg-zinc100 dark:hover:bg-zinc800  transition">
                    <div class="border-s-[3px] ps-4 leading-4 mb-4 text-zinc400 dark:text-zinc500 text-sm">{{ date }}</div>
                    <h3 class="mb-4">{{ title }}</h3>
                    <section class="z-10 mb-4 text-zinc500 dark:text-zinc400 text-sm leading-6">{{ preview }}</section>
                    <div class="text-sm text-teal500">Read article <span>></span></div>
                </article>
            </RouterLink>
        </div>
        <div class="space-y-10 lg:pl-16 xl:pl-24">
            <div class="border border-zinc200 dark:border-zinc800 p-8 rounded-2xl">
                <div class="flex gap-3">
                    <LetterIcon height="1.5rem" width="1.5rem" _class="text-zinc500" />
                    <h4 class="font-semibold">Stay up to date</h4>
                </div>
                <p class="mt-2 text-sm text-zinc500 dark:text-zinc400 leading-6">
                    Get notified when i publish someting new, and unsubscribe at any time.
                </p>
                <form class="mt-6 flex">
                    <input class="text-sm dark:text-zinc300 focus:outline shadow-md focus:ring-4 focus:ring-teal500/10 focus:outline-teal500 p-2 rounded-md w-full border border-zinc300 dark:border-zinc700 dark:bg-zinc800/10 dark:placeholder:text-zinc500 placeholder:text-zinc400 placeholder:text-sm placeholder:font-normal" type="text" name="email" placeholder="Email address">
                    <button 
                        class="p-2 hover:bg-zinc600 dark:hover:bg-zinc600 dark:bg-zinc700 bg-zinc800 transition rounded-md ml-4 text-zinc100"
                        @click.prevent=""
                    >Join</button>
                </form>
            </div>
            <div id="work_history" class="border border-zinc200 dark:border-zinc800 p-8 rounded-2xl">
                <div class="flex gap-3">
                    <PortfolioIcon height="1.5rem" width="1.5rem" _class="text-zinc500" />
                    <h4 class="font-semibold">Work</h4>
                </div>
                <div class="mt-6">
                    <div class="flex gap-4 items-center mb-4" v-for="{name, period, positionAtWork} of MyJobs" :key="name">
                        <div class="p-2 border border-zinc200 dark:border-zinc800 dark:bg-zinc800 rounded-full">
                            <xp_work _class="text-hoverText" height="2rem" width="2rem" />
                        </div>
                        <div class="w-full">
                            <p>{{ name }}</p>
                            <div class="flex justify-between text-sm text-zinc400 dark:text-zinc500 leading-8">
                                <p>{{ positionAtWork }}</p>
                                <p>{{ period }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6">
                    <button class="w-full hover:bg-zinc200 dark:hover:bg-zinc700 transition text-zinc800 bg-zinc100 dark:text-zinc200 dark:bg-zinc800 p-2 rounded-md">
                        <a href="/Serg_CV_2024.pdf" download >Download CV</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>