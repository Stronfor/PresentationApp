import {ColorsEnum} from "./types"
import type { IBoard, IFigures } from "./types"


class Figura_I implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.GREEN
    figureForm :number[][]
    downCells: number[][]

    constructor(){
        this.figureForm = [[3,0],[4,0],[5,0],[6,0]];
        this.downCells = [[3,0],[4,0],[5,0],[6,0]];
    }

    about(): string {
        return 'figure I'
    }

    move(){
        this.figureForm.forEach((item) => {
            item[1]+=1
        })
        this.downCells.forEach((item) => {
            item[1]+=1
        })
    }

    canMove(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }
    
}

class Figura_O implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.PURPLE
    figureForm :number[][]
    downCells: number[][]

    constructor(){
        this.figureForm = [[4,0],[5,0],[4,1],[5,1]];
        this.downCells = [[4,1],[5,1]];
    }

    about(): string {
        return 'figure O'
    }

    move(){
        this.figureForm.forEach((item) => {
            item[1]+=1
        })
        this.downCells.forEach((item) => {
            item[1]+=1
        })
    }

    canMove(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }
}

class Figura_T implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.YELLOW
    figureForm :number[][];
    downCells: number[][];

    constructor(){
        this.figureForm = [[4,0],[4,1],[5,1],[4,2]]
        this.downCells = [[4,2]]
    }

    about(): string {
        return 'figure T'
    }

    move(){
        this.figureForm.forEach((item) => {
            item[1]+=1
        })
        this.downCells.forEach((item) => {
            item[1]+=1
        })
    }

    canMove(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }
}

class Figura_L implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.RED
    figureForm :number[][];
    downCells: number[][];

    constructor(){
        this.figureForm = [[4,0], [5,0], [5,1], [5,2]];
        this.downCells = [[5,2]];
    }

    about(): string {
        return 'figure L'
    }

    move(){
        this.figureForm.forEach((item) => {
            item[1]+=1
        })
        this.downCells.forEach((item) => {
            item[1]+=1
        })
    }

    canMove(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }
}

class Figura_J implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.ORANGE
    figureForm :number[][];
    downCells: number[][];

    constructor(){
        this.figureForm = [[4,0], [5,0], [4,1], [4,2]];
        this.downCells = [[4,2]];
    }

    about(): string {
        return 'figure J'
    }

    move(){
        this.figureForm.forEach((item) => {
            item[1]+=1
        })
        this.downCells.forEach((item) => {
            item[1]+=1
        })
    }

    canMove(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }
}

class Figura_Z implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.BLUE
    figureForm :number[][];
    downCells: number[][];

    constructor(){
        this.figureForm = [[5,0], [5,1], [4,1], [4,2]];
        this.downCells = [[4,2]];
    }

    about(): string {
        return 'figure Z'
    }

    move(){
        this.figureForm.forEach((item) => {
            item[1]+=1
        })
        this.downCells.forEach((item) => {
            item[1]+=1
        })
    }

    canMove(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }
}

class Figura_S implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.GREY
    figureForm :number[][];
    downCells: number[][];

    constructor(){
        this.figureForm = [[4,0], [4,1], [5,1], [5,2]];
        this.downCells = [[5,2]];
    }

    about(): string {
        return 'figure S'
    }

    move(){
        this.figureForm.forEach((item) => {
            item[1]+=1
        })
        this.downCells.forEach((item) => {
            item[1]+=1
        })
    }

    canMove(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }
}

class Figura_D implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.VIOLET
    figureForm :number[][];
    downCells: number[][];

    constructor(){
        this.figureForm = [[4, 0]];
        this.downCells = [[4, 0]];
    }

    about(): string {
        return 'figure D'
    }

    move(){
        this.figureForm.forEach((item) => {
            item[1]+=1
        })
        this.downCells.forEach((item) => {
            item[1]+=1
        })
    }

    canMove(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }
}

export default class FigureFactory {
    public static createFigure(figureName: string){
        if(figureName === 'I') return new Figura_I()
        if(figureName === 'O') return new Figura_O()
        if(figureName === 'T') return new Figura_T()
        if(figureName === 'L') return new Figura_L()
        if(figureName === 'J') return new Figura_J()
        if(figureName === 'Z') return new Figura_Z()
        if(figureName === 'S') return new Figura_S()
        if(figureName === 'D') return new Figura_D()
        
        throw new Error(`${figureName}: Unknown Figure`)
    }
}