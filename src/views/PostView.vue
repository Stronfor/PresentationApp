<script setup lang="ts">
import { useRoute  } from "vue-router"

import postsPreview from '../../public/posts/postsPreview';

const route = useRoute()

const post = postsPreview[+route.params.id]

</script>
<template>
    <section class="py-20 min-h-screen">
        <h3 class="text-3xl mb-10 font-bold text-center">{{ post.title }}</h3>
        <div class="px-20 mb-4 text-zinc500 dark:text-zinc400 leading-8" v-html="post.post"></div>
        <div class="text-right px-20 text-zinc500 dark:text-zinc400">{{ post.date }}</div>
    </section>
</template>

<style>
h2 {
    font-size: 24px;
    padding-top: 15px;
    padding-bottom: 15px;
}
h3 {
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
}
pre {
    background-color: black;
    border: 1px solid gray;
    border-radius: 10px;
    margin: 20px 60px 20px 60px;
}
</style>