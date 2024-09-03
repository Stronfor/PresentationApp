import type { ICell } from "./types";
import { ColorsEnum } from "./types";


export default class Cell implements ICell {

    readonly id;
    readonly x: number;
    public y: number;

    public isEmpty: boolean;
    color: ColorsEnum;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.color = ColorsEnum.DEFAULT
        this.isEmpty = true;
        this.id = Math.random()
    }

    changeColor(color: ColorsEnum){
        this.color = color
    }

    changeEmpty(state: boolean){
        this.isEmpty = state
    }

}