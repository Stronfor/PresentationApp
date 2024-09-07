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

}