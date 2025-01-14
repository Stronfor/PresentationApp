import Cell from "./Cell";
import { type ICell, type IBoard, type IFigures, type IPlayer } from "./types";

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

    deleteRow(indexRow: number){
        this.cells = this.cells.filter((item, i) => i !== indexRow)
        const row: ICell[] = []
        for(let j = 0; j < 10; j++){
            row.push(new Cell(j, 0))
        }
        this.cells.unshift(row);
    }

    getCell([x, y]: number[]){
        return this.cells[y][x]
    }

    setFigure(figure: IFigures) {
        // Loop through each block in the figure's form and place it on the board
        for (const [x, y] of figure.figureForm) {
            const cell = this.getCell([x, y]);
            if (cell) {
                cell.isEmpty = false; // Mark the cell as occupied
                cell.color = figure.color; 
            }
        }
    }

    isBoardFull(){
        return this.cells[0][4].isEmpty === false || this.cells[0][5].isEmpty === false
    }
    
    score(player: IPlayer | null){
        this.cells.forEach((item:ICell[], i) => {
            const fullRow = item.every((cell: ICell) => !cell.isEmpty)
            if(fullRow){
                this.deleteRow(i)
                if(player)player.score++
            }
        })
    }
}