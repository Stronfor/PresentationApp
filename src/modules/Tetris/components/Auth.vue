<script setup lang="ts">
import {ref} from "vue"

import addPlayer from "../controllers/addPlayer.post"
import type { IPlayer } from "../composables/types";

const playerName = ref("");
const playerPass = ref("")

const Send = async() => {
   const request = await addPlayer(playerName.value, playerPass.value)
   if(request.success){
    currentPlayerData.value = {...request.data}
    console.log(currentPlayerData.value);
    
   }
    playerName.value = "";
    playerPass.value = "";
    console.log(request.message);

}

const currentPlayerData = ref<IPlayer>()

</script>
<template>
    <div class="border border-zinc200 dark:border-zinc800 rounded-2xl  p-6 mx-4 my-8">         
        <div v-if="true">
            <h4 class="text-2xl font-semibold mb-5">Register your score</h4>
            <form class="mt-6">
                <input type="text" name="playerName" placeholder="Enter name" minlength="3" maxlength="18"
                    v-model="playerName"
                    class="h-10 text-sm mb-6 dark:text-zinc300 focus:outline shadow-md focus:ring-4 focus:ring-teal500/10 focus:outline-teal500 p-2 rounded-md w-full border border-zinc300 dark:border-zinc700 dark:bg-zinc800/10 dark:placeholder:text-zinc500 placeholder:text-zinc400 placeholder:text-sm placeholder:font-normal"
                />
                <input type="password" name="playerPass" placeholder="Enter password" minlength="3" maxlength="18"
                    v-model="playerPass"
                    class="h-10 text-sm mb-6 dark:text-zinc300 focus:outline shadow-md focus:ring-4 focus:ring-teal500/10 focus:outline-teal500 p-2 rounded-md w-full border border-zinc300 dark:border-zinc700 dark:bg-zinc800/10 dark:placeholder:text-zinc500 placeholder:text-zinc400 placeholder:text-sm placeholder:font-normal"
                />
                <button 
                    class="py-2 px-5 hover:bg-zinc600 dark:hover:bg-zinc600 dark:bg-zinc700 bg-zinc800 transition rounded-md text-zinc100"
                    @click.prevent="Send"
                >Send</button>
            </form>
        </div>
        <div v-else>
            <h4>Hello</h4>
            <p>{{  }}</p>
            <button @click="">exit</button>
        </div>
    </div>
</template>