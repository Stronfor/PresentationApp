<script setup lang="ts">
    import { ref, onUnmounted, onMounted } from "vue";

    import { useTetrisStore } from "../store/Tetris.strore";
    import { storeToRefs } from 'pinia'

    import timeNow from "@/utils/timeNow";

    import Board from "../composables/Board"
    import FigureFactory from "../composables/Figures"
    import Auth from "./Auth.vue";

    import Arrow from "@/components/icons/Arrow.vue";
    import ArrowRotate from "@/components/icons/ArrowRotate.vue";
    import Play from "@/components/icons/Play.vue";
    import PauseImg from "@/components/icons/Pause.vue";
    import ScoreImg from "@/components/icons/ScoreImg.vue";
    import Players from "@/components/icons/Players.vue";

    import {DegEnum, type IBoard, type IFigures, type IPlayer} from "../composables/types"
    import Player from "../composables/Player";
    import updatePlayer from "../controllers/updatePlayer.put";
    import getBestPlayer from "../controllers/getBestPlayers.get";

    const controller = new AbortController();
    const signal = controller.signal;

    const TetrisStore = useTetrisStore();

    const { player } = storeToRefs(TetrisStore);
    const {setPlayer, setPlayerLastGame, setPlayerRecord, setPlayerName} = TetrisStore;

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
        if(!isPaused.value){
            const list = [DegEnum.DEFAULT, DegEnum.ONE, DegEnum.TWO, DegEnum.THREE];
            const result = list.indexOf(currentFigure.degree)
            const index = result === list.length-1 ? 0 : result + 1
            return currentFigure.rotateDeg(list[index], board.value)
        }
    }

// =======> Events <========

    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft" && !isPaused.value){
            e.preventDefault()
            btnPushLeft.value ='dark:shadow-xl shadow-2xl'
            return currentFigure.moveLeft(board.value);
        }
        if (e.key === "ArrowRight" && !isPaused.value){
            e.preventDefault()
            btnPushRight.value ='dark:shadow-xl shadow-2xl'
            return currentFigure.moveRight(board.value);
        }
        if (e.key === "ArrowDown" && !isPaused.value){
            e.preventDefault()
            btnPushDown.value ='dark:shadow-xl shadow-2xl'
            return speedGame.value = 50;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault()
            btnPushUp.value ='dark:shadow-xl shadow-2xl'
            return Rotate();
        }
        if (e.code === "Space"){
            e.preventDefault()
             return Pause();
        }
    }, {signal});

    document.addEventListener('keyup', (e) => {
        e.preventDefault()
        btnPushUp.value =''
        btnPushDown.value =''
        btnPushRight.value =''
        btnPushLeft.value =''
        if(e.key === "ArrowDown") return speedGame.value = 500;
    }, {signal});

    const playerExitEmit = () => {
        GameOver();
        currentPlayer.value = null;
    }

    const btnPushUp = ref("")
    const btnPushDown = ref("")
    const btnPushRight = ref("")
    const btnPushLeft = ref("")

</script>
<template>
  <div class="flex items-start">
    <div class="w-1/3">
      <div class="flex flex-col mb-14 mt-10">
        <div
          class="border border-zinc200 dark:border-zinc800 rounded-2xl p-10 mb-10"
        >
          <div class="flex gap-3">
            <ScoreImg _class="text-zinc500" width="32" height="32" />
            <h4 class="text-2xl font-semibold mb-5">Score</h4>
          </div>
          <p class="text-4xl font-bold">{{ currentPlayer?.score ?? 0 }}</p>
        </div>

        <button
          @mousedown="btnPushUp ='dark:shadow-xl shadow-2xl'"
          @mouseup="btnPushUp = ''"
          @click="Rotate"
          :class="btnPushUp"
          class="shadow-xl dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-4 rounded-xl mx-auto w-16 h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
        >
          <ArrowRotate _class="mx-auto text-hoverText" height="32" width="32" />
        </button>
        <div class="flex justify-center gap-16">
          <button
            @mousedown="btnPushLeft ='dark:shadow-xl shadow-2xl'"
            @mouseup="btnPushLeft = ''"
            :class="btnPushLeft"
            @click="currentFigure.moveLeft(board)"
            class="shadow-xl dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-4 rounded-xl w-20 h-16 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
          >
            <Arrow _class="mx-auto text-hoverText" height="32" width="32" />
          </button>
          <button
            @mousedown="btnPushRight ='dark:shadow-xl shadow-2xl'"
            @mouseup="btnPushRight = ''"
            :class="btnPushRight"
            @click="currentFigure.moveRight(board)"
            class="shadow-xl dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-4 rounded-xl w-20 h-16 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
          >
            <Arrow
              _class="mx-auto text-hoverText rotate-180"
              height="32"
              width="32"
            />
          </button>
        </div>
        <button
          @mousedown="speedGame = 50; btnPushDown ='dark:shadow-xl shadow-2xl'"
          @mouseup="speedGame = 500; btnPushDown = ''"
          :class="btnPushDown"
          class="mb-10 shadow-xl dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-4 rounded-xl mx-auto w-16 h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
        >
          <Arrow
            _class="mx-auto text-hoverText -rotate-90"
            height="32"
            width="32"
          />
        </button>

        <div class="flex justify-between gap-5">
          <button
            @click="isGameStarted ? GameOver() : Start()"
            class="shadow-xl text-hoverText outline-none border border-zinc300 dark:border-zinc600 mb-24 p-4 rounded-xl mx-auto w-40 h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
          >
            {{ isGameStarted ? "Stop Game" : "Start New Game" }}
          </button>
          <button
            :disabled="isGameOver"
            @click="Pause"
            class="shadow-xl outline-none w-24 h-20 border border-zinc300 dark:border-zinc600 p-4 rounded-xl mx-auto dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
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

    <div id="tetrisBoard" class="mt-10 mx-1 lg:mx-10 xl:mx-16 mb-10">
      <div class="row" v-for="(row, index) in board.cells" :key="index">
        <div
          class="cell"
          :style="`background-color: ${col.color}`"
          style="color: blueviolet"
          v-for="col in row"
          :key="col.id"
        ></div>
      </div>
    </div>

    <div class="w-1/3 mt-10">
      <Auth @player-exit="playerExitEmit" :isGameStarted />

      <div
        class="border border-zinc200 dark:border-zinc800 rounded-2xl p-10 h-80 mb-10"
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

  height: 35px;
  width: 35px;
  border: 1px solid rgb(48, 47, 47);
}
</style>
