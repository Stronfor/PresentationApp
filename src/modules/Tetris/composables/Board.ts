import Cell from "./Cell";
import type { ICell, IBoard } from "./types";


export default class Board implements IBoard {

    cells: ICell[][] = [];

    initCells(){
        for(let i = 0; i < 20; i++){
            const row: ICell[] = []
            for(let j = 0; j < 10; j++){
                row.push(new Cell(j, i))
            }
            this.cells.push(row)
        }
    }

    getCell([x, y]: number[]){
        return this.cells[y][x]
    }

    setFigure(figure: IFigure) {
        // Loop through each block in the figure's form and place it on the board
        for (const [x, y] of figure.figureForm) {
            const cell = this.getCell([x, y]);
            if (cell) {
                cell.isEmpty = false; // Mark the cell as occupied
                cell.color = figure.color; 
            }
        }
    }

    isGameOver(){
        return this.cells[0][4].isEmpty === false || this.cells[0][5].isEmpty === false
    }
}