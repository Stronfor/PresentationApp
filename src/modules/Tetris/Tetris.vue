<script setup lang="ts">
import { ref, onUnmounted, onMounted, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useTetrisStore } from "./store/Tetris.strore";
import { storeToRefs } from "pinia";

import timeNow from "@/utils/timeNow";
import AuthMini from "@/modules/Tetris/components/AuthMini.vue";
import BtnsControl from "@/modules/Tetris/components/BtnsControl.vue";
import Auth from "@/modules/Tetris/components/Auth.vue";
import PopupLogin from "@/modules/Tetris/components/PopupLogin.vue";
import BestPlayer from "@/modules/Tetris/components/BestPlayer.vue";

import Board from "./composables/Board";
import FigureFactory from "./composables/Figures";
import Player from "./composables/Player";
import updatePlayer from "./controllers/updatePlayer.put";
import getBestPlayer from "./controllers/getBestPlayers.get";

import ScoreImg from "@/components/icons/ScoreImg.vue";

import { type IBoard, type IFigures, type IPlayer } from "./composables/types";

const { width } = useWindowSize();

const TetrisStore = useTetrisStore();

const { getPlayerStore } = storeToRefs(TetrisStore);
const { setPlayerLastGame, setPlayerRecord, setPlayerName } = TetrisStore;

onMounted(async () => {
  await getBestPlayers();
});

onUnmounted(() => {
  isGameStarted.value = false;
  clearTimeout(GameCircle);
});

const speedGame = ref(500);
const board = ref<IBoard>(new Board());
board.value.initCells();

const isGameStarted = ref(false);
const isGameOver = ref(false);
const currentPlayer = ref<IPlayer | null>(null);
const isPaused = ref(false);
const BestPlayers = ref<{ name: string; record: number }[]>([]);

const getBestPlayers = async () => {
  const request = await getBestPlayer();
  if (request.success) {
    BestPlayers.value = request.data;
  }
};

const initialNewFigure = (type: string) => {
  const figure: IFigures = FigureFactory.createFigure(type);
  board.value.setFigure(figure);
  return figure;
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const randomFigure = () => {
  const allFigures = ["I", "O", "T", "L", "J", "Z", "S", "D"];
  const random = getRandomInt(0, allFigures.length);

  return allFigures[random];
};

let currentFigure: IFigures;

const moveFigure = () => {
  if (!isGameOver.value) {
    if (currentFigure.canMoveDown(board.value)) {
      if (!isPaused.value) currentFigure.movingDown(board.value);
    } else {
      if (board.value.isBoardFull()) {
        GameOver();
      } else {
        board.value.score(currentPlayer.value);
        currentFigure = initialNewFigure(randomFigure());
      }
    }
  }
};

const GameOver = async () => {
  clearTimeout(GameCircle);
  currentFigure = null as unknown as IFigures;
  isGameOver.value = true;
  isGameStarted.value = false;
  isPaused.value = true;

  if (currentPlayer.value?.name) {
    currentPlayer.value.record = getPlayerStore.value.record
    const record =
      currentPlayer.value?.record < currentPlayer.value?.score
        ? currentPlayer.value?.score
        : currentPlayer.value?.record;
    const lastGame = timeNow();

    const request = await updatePlayer(
      currentPlayer.value?.name,
      record,
      lastGame
    );
    if (request.success) {
      setPlayerRecord(request.data.record);
      setPlayerLastGame(request.data.lastGame);

      await getBestPlayers();
    }
  }
};

let GameCircle: number | undefined = undefined;

const circleGame = () => {
  if (!isPaused.value) {
    clearTimeout(GameCircle);
    GameCircle = setTimeout(() => {
      moveFigure();
      circleGame();
    }, speedGame.value);
  } else clearTimeout(GameCircle);
};

const Start = () => {
  isGameOver.value = false;
  board.value = new Board();
  board.value.initCells();
  if (!currentPlayer.value?.name && getPlayerStore.value.name)
    currentPlayer.value = new Player(
      getPlayerStore.value.name,
      getPlayerStore.value.record,
      getPlayerStore.value.lastGame
    );
  if (!getPlayerStore.value.name) currentPlayer.value = new Player();
  if (currentPlayer.value?.name) currentPlayer.value.score = 0;
  currentFigure = initialNewFigure(randomFigure());
  isGameStarted.value = true;
  isPaused.value = false;
  circleGame();
};

const Pause = () => {
  if (!isPaused.value) {
    isPaused.value = true;
  } else {
    isPaused.value = false;
    circleGame();
  }
};

const btnStart = () => {
  isGameStarted.value ? GameOver() : Start();
};

const isHiddenLogin = ref(true);

const closePopupOutsideClick = (e: Event) => {
  if (!isHiddenLogin.value) {
    const target = e.target as HTMLElement;
    if (target.id === "popupLoginWrapper") {
      isHiddenLogin.value = true;
    }
  }
};

const Exit = () => {
  setPlayerName("");
  setPlayerRecord(0);
  setPlayerLastGame("");
  GameOver();
  currentPlayer.value = null;
};

const cellSize = computed(() => {
  if (width.value <= 768) {
    return 25;
  }
  return 30;
});
</script>
<template>
  <div @click="closePopupOutsideClick">
    <AuthMini
      v-if="width < 768"
      :Exit
      :isGameStarted
      @handel-click="isHiddenLogin = false"
    />

    <div class="md:flex items-start relative px-4 md:p-0">
      <div class="w-full md:w-1/3">
        <BtnsControl
          @speed-change="(speed) => (speedGame = speed)"
          @pause="Pause"
          @start="btnStart"
          :isPaused
          :currentFigure
          :board
          :width
          :isGameStarted
          :isGameOver
        />
      </div>

      <div class="mt-5 sm:mt-10 md:mx-1 xl:mx-16 mb-10">
        <div class="flex gap-3 justify-center">
          <ScoreImg _class="text-zinc500" width="32" height="32" />
          <h4 class="text-2xl font-semibold mb-2 mr-5">Score:</h4>
          <span class="text-2xl font-semibold">{{
            currentPlayer?.score ?? 0
          }}</span>
        </div>
        <div id="tetrisBoard" class="mx-auto">
          <div class="row" v-for="(row, index) in board.cells" :key="index">
            <div
              class="cell"
              :style="`background-color: ${col.color}; height: ${cellSize}px; width: ${cellSize}px`"
              style="color: blueviolet"
              v-for="col in row"
              :key="col.id"
            ></div>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/3 mt-28">
        <Auth v-if="width > 768" @player-exit="Exit" :isGameStarted />
        <BestPlayer :BestPlayers />
      </div>
    </div>

    <PopupLogin
      class="fixed w-full top-2 right-1"
      :class="{ hidden: isHiddenLogin }"
      @close-popup="isHiddenLogin = true"
      title="Enter for save score"
    >
      <Auth @player-exit="Exit" :isGameStarted />
    </PopupLogin>
  </div>
</template>

<style scoped>
#tetrisBoard {
  width: fit-content;
  border: 10px solid greenyellow;
}

.row {
  display: flex;
}
.cell {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 100ms;
  border: 1px solid rgb(48, 47, 47);
}
</style>
