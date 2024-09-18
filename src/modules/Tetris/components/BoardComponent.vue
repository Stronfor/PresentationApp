<script setup lang="ts">
    import { ref, onUnmounted } from "vue";

    import Board from "../composables/Board"
    import FigureFactory from "../composables/Figures"
    import Arrow from "@/components/icons/Arrow.vue";
    import ArrowRotate from "@/components/icons/ArrowRotate.vue";
    import Play from "@/components/icons/Play.vue";
    import PauseImg from "@/components/icons/Pause.vue";
    import ScoreImg from "@/components/icons/ScoreImg.vue";
    import Players from "@/components/icons/Players.vue";

    import {DegEnum, type IBoard, type IFigures, type IPlayer} from "../composables/types"
    import Player from "../composables/Player";

    const controller = new AbortController();
    const signal = controller.signal;

    onUnmounted(()=> {
        controller.abort()
        isGameStarted.value = false;
        clearTimeout(GameCircle)
    });

    const speedGame = ref(500);
    const board = ref<IBoard>(new Board());
    board.value.initCells();
    const isGameStarted = ref(false);
    const currentPlayer = ref<IPlayer | undefined>();
    const isPaused = ref(false);
    const playerName = ref("")

    const setPlayer = () => {
        let players = localStorage.getItem("players") || {}
        console.log(players);
        

        const player = players[playerName.value]
        if(player){
            currentPlayer.value = new Player(playerName.value, '', player.record, player.lastGame)
        } else {
            currentPlayer.value = new Player(playerName.value)
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
        if(currentFigure.canMoveDown(board.value)){
            if(!isPaused.value)currentFigure.movingDown(board.value)
        } else {
            if(board.value.isGameOver()){
                isGameStarted.value = false;
                isPaused.value = true;
                gameOver()
            }else{
                board.value.score(currentPlayer.value)
                currentFigure = initialNewFigure(randomFigure())
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

    const gameOver = (nameP: string) => {
        
        
       /*  if(currentPlayer.value?.name){
            currentPlayer.value.lastGame =  new Intl.DateTimeFormat(undefined, {
                                                year: "2-digit",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit"
                                            }).format(Date.now())

            currentPlayer.value.record =  currentPlayer.value.record < currentPlayer.value.score ? currentPlayer.value.score : currentPlayer.value.record;

            

            const localStorPlayers = JSON.parse(localStorage.getItem("players")); 
            if(localStorPlayers){

                localStorPlayers.push({

                })

                console.log(localStorPlayers);
                
            } else {
                localStorage.setItem("players", JSON.stringify([{
                        name: currentPlayer.value.name,
                        record: currentPlayer.value.record,
                        lastGame: currentPlayer.value.lastGame
                    
                }]))
            } 
        }*/
    }

    const Start = () => {
        board.value =  new Board()
        board.value.initCells()
        if(!currentPlayer.value?.name) currentPlayer.value = new Player();
        currentFigure = initialNewFigure(randomFigure())
        isGameStarted.value = true;
        isPaused.value = false
        circleGame()
    }

    const StopGame = () => {
        clearTimeout(GameCircle);
        currentFigure = null as unknown as IFigures;
        isGameStarted.value = false;
        isPaused.value = true;
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
        if (e.key === "ArrowLeft" && !isPaused.value) return currentFigure.moveLeft(board.value);
        if (e.key === "ArrowRight" && !isPaused.value) return currentFigure.moveRight(board.value);
        if (e.key === "ArrowDown" && !isPaused.value) return speedGame.value = 50;
        if (e.key === "ArrowUp") return Rotate();
        if (e.code === "Space") return Pause();
    }, {signal});

    document.addEventListener('keyup', (e) => {
        if(e.key === "ArrowDown") return speedGame.value = 500;
    }, {signal});

</script>
<template>
    <div class="flex gap-8 items-center">
        <div class="w-1/3">
            <div class="flex flex-col gap-1 mb-14">
                <div class="border border-zinc200 dark:border-zinc800  rounded-2xl p-6 m-10">
                    <div v-if="!currentPlayer?.name">
                        <h4 class="text-2xl font-semibold mb-5">Register your score</h4>
                        <form class="mt-6 flex">
                            <input type="text" id="playerName" name="playerName" placeholder="Enter name" minlength="3" maxlength="12"
                                v-model="playerName"
                                class="text-sm dark:text-zinc300 focus:outline shadow-md focus:ring-4 focus:ring-teal500/10 focus:outline-teal500 p-2 rounded-md w-full border border-zinc300 dark:border-zinc700 dark:bg-zinc800/10 dark:placeholder:text-zinc500 placeholder:text-zinc400 placeholder:text-sm placeholder:font-normal"
                            />
                            <button 
                                class="p-2 hover:bg-zinc600 dark:hover:bg-zinc600 dark:bg-zinc700 bg-zinc800 transition rounded-md ml-4 text-zinc100"
                                @click.prevent="setPlayer"
                            >Send</button>
                        </form>
                    </div>
                    <div v-else>
                        <h4>Hello</h4>
                        <p>{{ currentPlayer.name }}</p>
                        <button @click="currentPlayer = undefined; playerName = ''">exit</button>
                    </div>
                    
                </div>
                <div class="flex justify-between gap-5">
                    <button @click="isGameStarted ? StopGame() : Start()" class="shadow-xl text-hoverText outline-none border border-zinc300 dark:border-zinc600 mb-24 p-4 rounded-xl mx-auto w-40 h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition">
                        {{isGameStarted ? 'Stop Game' : 'Start New Game'}}
                    </button>
                    <button @click="Pause" class="shadow-xl outline-none w-24 h-20 border border-zinc300 dark:border-zinc600 p-4 rounded-xl mx-auto dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition">
                        <Play v-if="isPaused" _class="mx-auto text-hoverText" width="32" height="32" />
                        <PauseImg v-else  _class="mx-auto text-hoverText" width="32" height="32" />
                    </button>
                </div>
                <button @click="Rotate" class="shadow-xl outline-none border border-zinc300 dark:border-zinc600 p-4 rounded-xl mx-auto w-16 h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition">
                    <ArrowRotate _class="mx-auto text-hoverText" height="32" width="32" />
                </button>
                <div class="flex justify-center gap-16">
                    <button @click="currentFigure.moveLeft(board)" class="shadow-xl outline-none border border-zinc300 dark:border-zinc600 p-4 rounded-xl w-20 h-16 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition">
                        <Arrow _class="mx-auto text-hoverText" height="32" width="32" />
                    </button>
                    <button @click="currentFigure.moveRight(board)" class="shadow-xl outline-none border border-zinc300 dark:border-zinc600 p-4 rounded-xl w-20 h-16 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition">
                        <Arrow _class="mx-auto text-hoverText rotate-180" height="32" width="32" />
                    </button>
                </div>
                <button @mousedown="speedGame = 50" @mouseup="speedGame = 500" class="shadow-xl outline-none border border-zinc300 dark:border-zinc600 p-4 rounded-xl mx-auto w-16 h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition">
                    <Arrow _class="mx-auto text-hoverText -rotate-90" height="32" width="32" />
                </button>
            </div>
        </div>
        <div id="tetrisBoard" >
            <div class="row" v-for="row, index in board.cells" :key="index">
                <div class="cell" :style="`background-color: ${col.color}`" style="color: blueviolet" v-for="col in row" :key="col.id"></div>
            </div>
        </div>
        <div class="w-1/3">
            <div class="border border-zinc200 dark:border-zinc800  rounded-2xl p-10 m-10">
                <div class="flex gap-3">
                    <ScoreImg _class="text-zinc500" width="32" height="32" />
                    <h4 class="text-2xl font-semibold mb-5">Score</h4>
                </div>
                <p class="text-4xl font-bold">{{ currentPlayer?.score ?? 0 }}</p>
            </div>
            <div class="border border-zinc200 dark:border-zinc800  rounded-2xl p-10 m-10">
                <div class="flex gap-3">
                    <Players _class="text-zinc500" width="32" height="32" />
                    <h4 class="text-2xl font-semibold mb-5">Best players</h4>
                </div>
                <div>
                    <div class="flex justify-between items-center">
                        <p class="text-xl leading-10 text-hoverText">Serg: </p><span class="text-zinc500">{{ 10050 }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="text-xl leading-10 text-hoverText">Timoty: </p><span class="text-zinc500">{{ 10050 }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="text-xl leading-10 text-hoverText">Anastasiya: </p><span class="text-zinc500">{{ 10050 }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="text-xl leading-10 text-hoverText">Dark: </p><span class="text-zinc500">{{ 10050 }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="text-xl leading-10 text-hoverText">Light: </p><span class="text-zinc500">{{ 10050 }}</span>
                    </div>
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
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 100ms;

        height: 35px;
        width: 35px;
        border: 1px solid rgb(48, 47, 47);
    }

</style>