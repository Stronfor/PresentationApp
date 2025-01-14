<script setup lang="ts">
import { ref } from "vue";
import { useTetrisStore } from "../store/Tetris.strore";
import { storeToRefs } from "pinia";

import addPlayer from "../controllers/addPlayer.post";
import getPlayer from "../controllers/getPlayer.post";

const emits = defineEmits(["playerExit"])

defineProps({
    isGameStarted: {type: Boolean, required: true}
})

const TetrisStore = useTetrisStore();

const { getPlayerStore } = storeToRefs(TetrisStore);
const { setPlayer } = TetrisStore;

const playerName = ref("");
const playerPass = ref("");

const Login = async () => {
  const requestToGet = await getPlayer(playerName.value, playerPass.value);
  if (requestToGet.success) setPlayer(requestToGet.data);

  playerName.value = "";
  playerPass.value = "";
};

const SignIn = async () => {
  const requestToAdd = await addPlayer(playerName.value, playerPass.value);
  if (requestToAdd.success) setPlayer(requestToAdd.data);

  playerName.value = "";
  playerPass.value = "";
};

</script>
<template>
  <div class="border border-zinc200 dark:border-zinc800 rounded-2xl p-6 mb-10">
    <div v-if="!getPlayerStore.name">
      <h4 class="text-2xl font-semibold mb-5">Enter for save score</h4>
      <form class="mt-6">
        <input
          type="text"
          name="playerName"
          placeholder="Enter name"
          minlength="3"
          maxlength="18"
          autocomplete="off"
          v-model="playerName"
          class="h-10 text-sm mb-6 dark:text-zinc300 focus:outline shadow-md focus:ring-4 focus:ring-teal500/10 focus:outline-teal500 p-2 rounded-md w-full border border-zinc300 dark:border-zinc700 dark:bg-zinc800/10 dark:placeholder:text-zinc500 placeholder:text-zinc400 placeholder:text-sm placeholder:font-normal"
        />
        <input
          type="password"
          name="playerPass"
          placeholder="Enter password"
          minlength="3"
          maxlength="18"
          autocomplete="off"
          v-model="playerPass"
          class="h-10 text-sm mb-6 dark:text-zinc300 focus:outline shadow-md focus:ring-4 focus:ring-teal500/10 focus:outline-teal500 p-2 rounded-md w-full border border-zinc300 dark:border-zinc700 dark:bg-zinc800/10 dark:placeholder:text-zinc500 placeholder:text-zinc400 placeholder:text-sm placeholder:font-normal"
        />
        <div class="flex gap-8 justify-center">
          <button
            :disabled="isGameStarted"
            class="py-2 px-5 hover:bg-zinc600 dark:hover:bg-zinc600 dark:bg-zinc700 bg-zinc800 transition rounded-md text-zinc100"
            @click.prevent="Login"
          >
            Enter
          </button>
          <button
            :disabled="isGameStarted"
            class="py-2 px-5 hover:bg-zinc600 dark:hover:bg-zinc600 dark:bg-zinc700 bg-zinc800 transition rounded-md text-zinc100"
            @click.prevent="SignIn"
          >
            Register
          </button>
        </div>
      </form>
    </div>
    <div v-else>
      <p class="mb-8 text-center">
        Hello <span class="text-xl">{{ getPlayerStore.name }}</span>
      </p>
      <section class="flex justify-between">
        <span class="mb-4">Record: </span><span>{{ getPlayerStore.record }}</span>
      </section>
      <section class="flex justify-between">
        <p class="mb-8">Last Game:</p>
        <span>{{ getPlayerStore.lastGame }}</span>
      </section>
      <template class="flex justify-end">
        <button
          class="py-2 px-5 hover:bg-zinc600 dark:hover:bg-zinc600 dark:bg-zinc700 bg-zinc800 transition rounded-md text-zinc100"
          @click="emits('playerExit')"
        >
          EXIT
        </button>
      </template>
    </div>
  </div>
</template>
