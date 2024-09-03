<script setup lang="ts">
    import { ref, onBeforeMount, computed, watch } from "vue";
    import Board from "../composables/Board"
    import FigureFactory from "../composables/Figures"




    import { ColorsEnum } from "../composables/types";

    import type {IFigures} from "../composables/types"



    const restart = () => {
        const tetrisBoard = new Board();
        tetrisBoard.initCells();
        return tetrisBoard
    }

    const board = ref(new Board());
    
    board.value.initCells()
    
    
    const initialNewFigure = (type: string) => {
        const figure = FigureFactory.createFigure(type)
        figure.figureForm.forEach((item: number[]) => {
            const cell = ref(board.value.getCell(item))
            cell.value?.changeColor(figure.color);
            cell.value?.changeEmpty(false)
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
        const canFIgureMove = currentFigure.value.canMove(board.value)

        if(canFIgureMove){
            currentFigure.value.figureForm.forEach((item: number[]) => {
                const cell = ref(board.value.getCell(item))
                cell.value?.changeColor(ColorsEnum.DEFAULT);
                cell.value?.changeEmpty(true)
            })
            currentFigure.value.move()

            currentFigure.value.figureForm.forEach((item: number[]) => {
                const cell = ref(board.value.getCell(item))
                cell.value?.changeColor(currentFigure.value.color);
                cell.value?.changeEmpty(false)
            })
        } else {
           return currentFigure.value = initialNewFigure(randomFigure())
        }
        
    }

    let GameCircle: number | null = null

    const Game = () => {
        GameCircle = setTimeout(()=>{

            moveFigure()

            clearTimeout(GameCircle)
            Game()

        },300)
    }
    Game()
   

</script>
<template>
    <div id="tetrisBoard" class="w-full">
        <div class="row" v-for="row, index in board.cells" :key="index">
            <div class="cell" :style="`background-color: ${col.color}`" v-for="col in row" :key="col.id"></div>
        </div>
    </div>
</template>
<style scoped>

    #tetrisBoard {
        margin: auto;
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

</style>const 