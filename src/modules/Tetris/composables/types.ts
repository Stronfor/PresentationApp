

export interface IBoard {
    cells: ICell[][]
    initCells():void
    getCell([]): ICell | undefined
    setFigure(figure: IFigures):void
    isGameOver():boolean
}

type aboutFigureType = {
    name: string
    degree: DegEnum
    form: number[][]
    color: ColorsEnum
    leftCells: number[][],
    rightCells: number[][],
    downCells: number[][]
}

export interface IFigures {
    color: ColorsEnum
    figureForm: number[][]
    downCells: number[][]
    degree: DegEnum

    about():aboutFigureType
    checkMoveDirection(board: IBoard):void
    canMoveDown(board: IBoard): boolean
    moveRight(): void
    moveLeft(): void
    rotate?(deg: DegEnum, board: IBoard): void
    moveDeg(deg: DegEnum): void
    changeRotationCells(figure: number[][],q:number[],w:number[],e:number[],r:number[]):number[][]
}

export interface ICell {
    id: number
    x: number
    y: number
    isEmpty: boolean
    color: ColorsEnum

    changeColor(x: ColorsEnum): void
    changeEmpty(state: boolean): void

}

export enum ColorsEnum {
    DEFAULT = 'black',
    YELLOW = 'yellow',
    GREEN = '#0eff00',
    PURPLE = 'rgb(247 92 228)',
    RED = 'rgb(255 22 0)',
    BLUE = '#36e4da',
    ORANGE = 'rgb(247 132 0',
    VIOLET = 'rgb(97 105 255)',
    GREY = 'grey'
}

export enum DegEnum {
    ONE = 90,
    TWO = 180,
    THREE = 270,
    DEFAULT = 360
}