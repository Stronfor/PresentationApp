<script setup lang="ts">
    import { ref, onBeforeMount, computed, watch } from "vue";
    import Board from "../composables/Board"
    import FigureFactory from "../composables/Figures"




    import { ColorsEnum } from "../composables/types";

    import type {IBoard, IFigures} from "../composables/types"


    const restart = () => {
        const tetrisBoard = new Board();
        tetrisBoard.initCells();
        return tetrisBoard
    }

    const board = ref<IBoard>(new Board());
    board.value.initCells()
    
   
    const initialNewFigure = (type: string) => {
        const figure = FigureFactory.createFigure(type)
        figure.figureForm.forEach((item: number[]) => {
            const cell = board.value.getCell(item)
            cell?.changeColor(figure.color);
            cell?.changeEmpty(false)
        })
        return figure
    }

    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
    }

    const randomFigure = () => {
        const allFigures = ['I', 'O', 'T', 'L', 'J', 'Z', 'S', 'D']
        const random = getRandomInt(0, allFigures.length)

        return allFigures[random]
    }

    const currentFigure = ref<IFigures>(initialNewFigure(randomFigure()))

    const moveFigure = () => {
        const canFIgureMoveDown = currentFigure.value.canMoveDown(board.value)

        if(canFIgureMoveDown){
            currentFigure.value.move(board.value)
        } else {
            if(board.value.cells[0][4].isEmpty === false || board.value.cells[0][5].isEmpty === false){
               return /* board.value = restart() */ StartStopGame(false)
            }
            return currentFigure.value = initialNewFigure(randomFigure())
        }
        
    }

    let GameCircle: number | null = null

    const StartStopGame = (start: boolean) => {

            if(GameCircle !== null) clearTimeout(GameCircle)
            if(start){
                GameCircle = setTimeout(()=>{

                    moveFigure()
                    clearTimeout(GameCircle)
                    StartStopGame(true)

                },500)
            }
        
    }
    const isGameStarted = ref(true)
    StartStopGame(true)

    const Pause = () => {
        if(isGameStarted.value){
            StartStopGame(false);
            isGameStarted.value = false;
        } else {
            StartStopGame(true);
            isGameStarted.value  = true;
        }
    }

    const Restart = () => {
        board.value = new Board();
        board.value.initCells();
        currentFigure.value = initialNewFigure(randomFigure()); 
        StartStopGame(true);
        isGameStarted.value = true;
    }


    document.addEventListener('keydown', (e) => {
        e.preventDefault()
        if(e.key === "ArrowLeft"){
            return currentFigure.value.moveLeft()
        }
    })

    document.addEventListener('keydown', (e) => {
        e.preventDefault()
        if(e.key === "ArrowRight"){
            return currentFigure.value.moveRight()
        }
    })

</script>
<template>
    <div class="flex gap-8 items-center">
        <div class="w-[30%] flex justify-center gap-4">
            <button @click="currentFigure.moveLeft()" class="border-2 p-4 rounded-md">Left</button>
            <button @click="currentFigure.moveRight()" class="border-2 p-4 rounded-md">Right</button>
            <button @click="" class="border-2 p-4 rounded-md">Down</button>
            <button @click="Pause" class="border-2 p-4 rounded-md">Pause</button>
        </div>
        <div id="tetrisBoard" >
            <div class="row" v-for="row, index in board.cells" :key="index">
                <div class="cell" :style="`background-color: ${col.color}`" style="color: blueviolet" v-for="col in row" :key="col.id"></div>
            </div>
        </div>
        <div class="w-[30%] flex justify-center">
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