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

    getCell(coord: [x: number, y: number]){
        return this.cells[coord[1]].find(cell => cell.x === coord[0])
    }

}