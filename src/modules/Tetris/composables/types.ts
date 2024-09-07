

export interface IBoard {
    cells: ICell[][]
    initCells():void
    getCell([]): ICell | undefined
}

export interface IFigures {
    color: ColorsEnum
    figureForm: number[][]
    downCells: number[][]

    about():string
    move(board: IBoard):void
    canMoveDown(board: IBoard): boolean
    moveRight(): void
    moveLeft(): void
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