<script setup lang="ts">
    import { ref, onUnmounted, onMounted } from "vue";
    import Board from "../composables/Board"
    import FigureFactory from "../composables/Figures"

    import {DegEnum, type IBoard, type IFigures} from "../composables/types"

    const controller = new AbortController();
    const signal = controller.signal;

    onUnmounted(()=> {
        controller.abort()
        Stop();
        clearTimeout(GameCircle)
    });
    onMounted(() => Start());

    const speedGame = ref(500);
    const board = ref<IBoard>(new Board());
    board.value.initCells();
    const isGameStarted = ref(false);
    
    
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

    let currentFigure:IFigures = initialNewFigure(randomFigure())

    const moveFigure = () => {
    
        if(currentFigure.canMoveDown(board.value)){
            currentFigure.checkMoveDirection(board.value)
        } else {
            if(board.value.isGameOver()){
                Stop()
            }else{
                currentFigure = initialNewFigure(randomFigure())
            }
        }
    }

    let GameCircle: number | undefined = undefined

    const StartStopGame = () => {
        if(isGameStarted.value){
            clearTimeout(GameCircle)
            GameCircle = setTimeout(()=>{
               moveFigure()
                StartStopGame()
            }, speedGame.value)
        } else clearTimeout(GameCircle)
    }

    const Start = () => {
        isGameStarted.value = true;
        StartStopGame()
    }

    const Stop = () => {
        isGameStarted.value = false;
    }

    const Pause = () => {
        if(isGameStarted.value){
            Stop()
        } else {
            isGameStarted.value  = true;
            StartStopGame();
        }
    }

    const Restart = () => {
        Stop();
        clearTimeout(GameCircle);
        board.value = new Board();
        board.value.initCells();
        currentFigure = initialNewFigure(randomFigure()); 
        Start()
    }
    
    const Rotate = () => {
        const list = [DegEnum.DEFAULT, DegEnum.ONE, DegEnum.TWO, DegEnum.THREE];
        const result = list.indexOf(currentFigure.degree)
        const index = result === list.length-1 ? 0 : result + 1

        return currentFigure.moveDeg(list[index])
    }

    // =======> Events <========

    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.key === "ArrowLeft") return currentFigure.moveLeft();
        if (e.key === "ArrowRight") return currentFigure.moveRight();
        if (e.key === "ArrowDown") return speedGame.value = 100;
        if (e.key === "ArrowUp") return Rotate();
        if (e.code === "Space") return Pause();
    }, {signal});

    document.addEventListener('keyup', (e) => {
        e.preventDefault()
        if(e.key === "ArrowDown") return speedGame.value = 500;
    }, {signal});

</script>
<template>
    <div class="flex gap-8 items-center">
        <div class="w-[30%] flex justify-center gap-4">
            <button @click="currentFigure.moveLeft()" class="border-2 p-4 rounded-md">Left</button>
            <button @click="currentFigure.moveRight()" class="border-2 p-4 rounded-md">Right</button>
            <button @mousedown="speedGame = 100" @mouseup="speedGame = 500" class="border-2 p-4 rounded-md">Down</button>
            <button @click="Rotate" class="border-2 p-4 rounded-md">Rotate</button>
        </div>
        <div id="tetrisBoard" >
            <div class="row" v-for="row, index in board.cells" :key="index">
                <div class="cell" :style="`background-color: ${col.color}`" style="color: blueviolet" v-for="col in row" :key="col.id"></div>
            </div>
        </div>
        <div class="w-[30%] flex justify-center">
            <button @click="Pause" class="border-2 p-4 rounded-md">Pause</button>
            <button @click="Restart" class="border-2 p-4 rounded-md">Restart</button>
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