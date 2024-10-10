<script setup lang="ts">
    import { ref, onUnmounted, onMounted, computed } from "vue";
    import { useWindowSize } from "@vueuse/core";

    import { useTetrisStore } from "../store/Tetris.strore";
    import { storeToRefs } from 'pinia'

    import timeNow from "@/utils/timeNow";

    import Board from "../composables/Board"
    import FigureFactory from "../composables/Figures"
    import Auth from "./Auth.vue";
    import PopupLogin from "./PopupLogin.vue";
    import Player from "../composables/Player";
    import updatePlayer from "../controllers/updatePlayer.put";
    import getBestPlayer from "../controllers/getBestPlayers.get";

    import Arrow from "@/components/icons/Arrow.vue";
    import ArrowRotate from "@/components/icons/ArrowRotate.vue";
    import Play from "@/components/icons/Play.vue";
    import PauseImg from "@/components/icons/Pause.vue";
    import ScoreImg from "@/components/icons/ScoreImg.vue";
    import Players from "@/components/icons/Players.vue";

    import {DegEnum, type IBoard, type IFigures, type IPlayer} from "../composables/types"

    const { width, height } = useWindowSize();

    const controller = new AbortController();
    const signal = controller.signal;

    const TetrisStore = useTetrisStore();

    const { player } = storeToRefs(TetrisStore);
    const { setPlayerLastGame, setPlayerRecord, setPlayerName} = TetrisStore;

    onMounted(async()=>{
        await getBestPlayers()
    })

    onUnmounted(()=> {
        controller.abort()
        isGameStarted.value = false;
        clearTimeout(GameCircle)
    });

    const speedGame = ref(500);
    const board = ref<IBoard>(new Board());
    board.value.initCells();
    const isGameStarted = ref(false);
    const isGameOver = ref(false);
    const currentPlayer = ref<IPlayer | null>(null);
    const isPaused = ref(false);
    const BestPlayers = ref<{ name: string; record: number; }[]>([]);

    const getBestPlayers = async() => {
        const request = await getBestPlayer();
        if(request.success) {
            BestPlayers.value = request.data
        }
    }

    const initialNewFigure = (type: string) => {
        const figure: IFigures = FigureFactory.createFigure(type)
        board.value.setFigure(figure);
        return figure;
    }

    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const randomFigure = () => {
        const allFigures = ['I', 'O', 'T', 'L', 'J', 'Z', 'S', 'D']
        const random = getRandomInt(0, allFigures.length)

        return allFigures[random]
    }

    let currentFigure:IFigures

    const moveFigure = () => {
        if(!isGameOver.value){
            if(currentFigure.canMoveDown(board.value)){
                if(!isPaused.value)currentFigure.movingDown(board.value)
            } else {
                if(board.value.isBoardFull()){
                    GameOver()
                }else{
                    board.value.score(currentPlayer.value)
                    currentFigure = initialNewFigure(randomFigure())
                }
            }
        }
    }

    const GameOver = async() => {
        clearTimeout(GameCircle);
        currentFigure = null as unknown as IFigures;
        isGameOver.value= true;
        isGameStarted.value = false;
        isPaused.value = true;

        if(currentPlayer.value?.name){
            const record = currentPlayer.value?.record < currentPlayer.value?.score ? currentPlayer.value?.score : currentPlayer.value?.record
            const lastGame = timeNow()
            
            const request = await updatePlayer(currentPlayer.value?.name, record, lastGame);
            if(request.success) {
                setPlayerRecord(request.data.record)
                setPlayerLastGame(request.data.lastGame)

                await getBestPlayers();
            }
        }
    }

    let GameCircle: number | undefined = undefined

    const circleGame = () => {
        if(!isPaused.value){
            clearTimeout(GameCircle)
            GameCircle = setTimeout(()=>{
               moveFigure()
               circleGame()
            }, speedGame.value)
        } else clearTimeout(GameCircle)
    }

    const Start = () => {
        isGameOver.value= false;
        board.value =  new Board()
        board.value.initCells()
        if(!currentPlayer.value?.name && player.value.name) currentPlayer.value = new Player(player.value.name, player.value.record, player.value.lastGame);
        if(!player.value.name) currentPlayer.value = new Player()
        if(currentPlayer.value?.name) currentPlayer.value.score = 0;
        currentFigure = initialNewFigure(randomFigure())
        isGameStarted.value = true;
        isPaused.value = false
        circleGame()
    }

    const Pause = () => {
        if(!isPaused.value){
            isPaused.value = true;
        } else {
            isPaused.value = false;
            circleGame();
        }
    }

    const Rotate = () => {
        if(currentFigure && !isPaused.value){
            const list = [DegEnum.DEFAULT, DegEnum.ONE, DegEnum.TWO, DegEnum.THREE];
            const result = list.indexOf(currentFigure.degree)
            const index = result === list.length-1 ? 0 : result + 1
            return currentFigure.rotateDeg(list[index], board.value)
        }
    }

    const cellSize = computed(()=> {
      if(width.value <= 768){
        return 25
      }
      return 30
    });

    const btnStart = () => {
      isGameStarted.value ? GameOver() : Start()
    }

    const isHiddenLogin = ref(true);

    const closePopupOutsideClick = (e: Event) => {
      if (!isHiddenLogin.value) {
        const target = e.target as HTMLElement;
        if (target.id === "popupLoginWrapper") {
          isHiddenLogin.value = true;
        }
      }
    };

// =======> Events <========

    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft" && !isPaused.value){
            e.preventDefault()
            btnPushLeft.value = true
            if(currentFigure) return currentFigure.moveLeft(board.value);
        }
        if (e.key === "ArrowRight" && !isPaused.value){
            e.preventDefault()
            btnPushRight.value = true
            if(currentFigure) return currentFigure.moveRight(board.value);
        }
        if (e.key === "ArrowDown" && !isPaused.value){
            e.preventDefault()
            btnPushDown.value = true
            if(currentFigure) return speedGame.value = 50;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault()
            btnPushUp.value = true
            if(currentFigure) return Rotate();
        }
        if (e.code === "Space"){
            e.preventDefault()
            btnPushPause.value = true
            return Pause();
        }
    }, {signal});

    document.addEventListener('keyup', (e) => {
        e.preventDefault()
        btnPushUp.value = false; 
        btnPushDown.value = false;
        btnPushRight.value = false;
        btnPushLeft.value = false;
        btnPushPause.value = false;
        btnPushStart.value = false
        if(e.key === "ArrowDown") return speedGame.value = 500;
    }, {signal});

    const btnPushUp = ref(false)
    const btnPushDown = ref(false)
    const btnPushRight = ref(false)
    const btnPushLeft = ref(false)
    const btnPushStart = ref(false)
    const btnPushPause = ref(false)
    const active = "box-shadow: inset 0 0.1em 0.4em #d4d4d8;";


    const Exit = () => {
      setPlayerName("");
      setPlayerRecord(0);
      setPlayerLastGame("");
      GameOver();
      currentPlayer.value = null;
    };

</script>
<template>
  <div @click="closePopupOutsideClick">
    <div v-if="width < 768">
      <button v-if="!player.name"
        class="absolute top-6 ml-2 h-12 w-24 rounded-full border-2 shadow-sm border-borderLight hover:bg-lightBg dark:border-borderDark dark:hover:bg-darkBg"
        @click="isHiddenLogin = false"
        :disabled="isGameStarted"
      >
        Enter
      </button>
      <section v-else class="absolute top-4 ml-2 p-2 h-18 w-48 rounded-2xl border-2 shadow-sm border-borderLight dark:border-borderDark">
        <div class="text-teal500">{{ player.name }}</div>
        <div class="flex justify-between justify-items-center">
          <div class="mt-1">Record: {{ player.record }}</div>
          <button
            class="py-1 px-3 hover:bg-zinc600 dark:hover:bg-zinc600 dark:bg-zinc700 bg-zinc800 transition rounded-md text-zinc100"
            @click="Exit"
          >
            Exit
          </button>
        </div>
        
      </section>
    </div>
    <div class="md:flex items-start relative px-4 md:p-0">
      <div class="w-full md:w-1/3">
        <div @touchstart.prevent class="flex flex-col mb-14 absolute md:relative md:top-40   top-[500px] md:right-0 -right-0">
          <button
            @mousedown="btnPushUp = true"
            @mouseup="btnPushUp = false"
            @touchstart="btnPushUp = true; Rotate()"
            @touchendt="btnPushUp = false"
            @mouseout.prevent="btnPushUp = false"
            @click="Rotate"
            :style="btnPushUp ? active : null"
            class="shadow-xl -mb-2 opacity-50 shadow-zinc300 dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-0 md:p-4 rounded-t-xl rounded-b-3xl mx-auto w-12 h-16 md:w-16 md:h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
          >
            <ArrowRotate _class="mx-auto text-hoverText md:h-[32px] md:w-[32px] h-[26px] w-[26px]" />
          </button>
          <div class="flex justify-center gap-10">
            <button
              @mousedown="btnPushLeft = true"
              @mouseup="btnPushLeft = false"
              @touchstart="btnPushLeft = true; currentFigure.moveLeft(board)"
              @touchend="btnPushLeft = false"
              @mouseout.prevent="btnPushLeft = false"
              :style="btnPushLeft ? active : null"
              @click="()=> {if(currentFigure)currentFigure.moveLeft(board)}"
              class="shadow-xl opacity-50 dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-0 md:p-4 rounded-l-xl rounded-r-3xl md:w-20 md:h-16 w-16 h-12 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
            >
              <Arrow _class="mx-auto text-hoverText md:h-[32px] md:w-[32px] h-[26px] w-[26px]" />
            </button>
            <button
              @mousedown.prevent="btnPushRight = true"
              @mouseup.prevent="btnPushRight = false"
              @touchstart="btnPushRight = true; currentFigure.moveRight(board)"
              @touchend="btnPushRight = false"
              @mouseout.prevent="btnPushRight = false"
              :style="btnPushRight ? active : null"
              @click="()=> {if(currentFigure)currentFigure.moveRight(board)}"
              class="shadow-xl opacity-50 dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-0 md:p-4 rounded-r-xl rounded-l-3xl md:w-20 md:h-16 w-16 h-12 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
            >
              <Arrow
                _class="mx-auto text-hoverText rotate-180 md:h-[32px] md:w-[32px] h-[26px] w-[26px]"
              />
            </button>
          </div>
          <button
            @mousedown.prevent="speedGame = 50; btnPushDown = true"
            @mouseup.prevent="speedGame = 500; btnPushDown = false"
            @touchstart="speedGame = 50;btnPushDown = true"
            @touchend="speedGame = 500;btnPushDown = false"
            @mouseout.prevent="speedGame = 500; btnPushDown = false"
            :style="btnPushDown ? active : null"
            class="mb-10 -mt-2 opacity-50 shadow-xl dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-0 md:p-4 rounded-b-xl rounded-t-3xl mx-auto w-12 h-16 md:w-16 md:h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
          >
            <Arrow _class="mx-auto text-hoverText -rotate-90 md:h-[32px] md:w-[32px] h-[26px] w-[26px]" />
          </button>

          <div class="absolute md:relative md:right-0 top-12 right-48 flex mt-10 justify-between gap-5">
            <button
              @mousedown="btnPushStart = true"
              @mouseup="btnPushStart = false"
              @touchstart="btnPushStart = true; btnStart()"
              @touchend="btnPushStart = false"
              @mouseout.prevent="btnPushStart = false"
              :style="btnPushStart ? active : null"
              @click="btnStart"
              class="sm:w-30 shadow-xl px-4 rounded-full dark:shadow-md dark:shadow-zinc500 text-hoverText outline-none border border-zinc300 dark:border-zinc600 mb-24 sm:rounded-xl mx-auto h-16  sm:h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
            >
              <span v-if="width >= 480">{{ isGameStarted ? "Stop Game" : "Start New Game" }}</span>
              <span v-else>{{ isGameStarted ? "Stop" : "Start" }}</span>
            </button>
            <button
              @mousedown="btnPushPause = true"
              @mouseup="btnPushPause = false"
              @touchstart="btnPushPause = true; Pause()"
              @touchend="btnPushPause = false"
              @mouseout.prevent="btnPushPause = false"
              :style="btnPushPause ? active : null"
              :disabled="isGameOver"
              @click="Pause"
              class="shadow-xl dark:shadow-md md:h-20 dark:shadow-zinc500 rounded-full outline-none md:w-24 h-16 w-20 border border-zinc300 dark:border-zinc600 p-4 md:rounded-xl mx-auto dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
            >
              <Play
                v-if="isPaused"
                _class="mx-auto text-hoverText"
                width="32"
                height="32"
              />
              <PauseImg
                v-else
                _class="mx-auto text-hoverText"
                width="32"
                height="32"
              />
            </button>
          </div>
        </div>
      </div>

      <div class="mt-5 sm:mt-10 md:mx-1 xl:mx-16 mb-10">
        <div class="flex gap-3 justify-center">
          <ScoreImg _class="text-zinc500" width="32" height="32" />
          <h4 class="text-2xl font-semibold mb-2 mr-5">Score: </h4> <span class="text-2xl font-semibold">{{ currentPlayer?.score ?? 0 }}</span>
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

        <div
          class="border border-zinc200 dark:border-zinc800 rounded-2xl p-10 max-h-80 mb-10"
        >
          <div class="flex gap-3">
            <Players _class="text-zinc500" width="32" height="32" />
            <h4 class="text-2xl font-semibold mb-5">Best players</h4>
          </div>
          <div v-for="{name, record} in BestPlayers" :key="name" 
              class="flex justify-between items-center"
          >
              <p class="text-xl leading-10 text-hoverText">{{ name }}:</p>
              <span class="text-zinc500">{{ record }}</span>
          </div>
        </div>
      </div>
    </div>

    <PopupLogin class="fixed w-full top-2 right-1"
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
