import {ColorsEnum} from "./types"
import type { IBoard, IFigures } from "./types"


class Figura {
    nextTickMoveDerection: string | null = null;


}



class Figura_I implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.GREEN
    figureForm :number[][];
    downCells: number[][];
    rightCells: number[][];
    leftCells: number[][];
    nextTickMoveDerection: string | null = null;

    constructor(){
        this.figureForm = [[3,0],[4,0],[5,0],[6,0]];
        this.downCells = [[3,0],[4,0],[5,0],[6,0]];
        this.rightCells = [[6,0]];
        this.leftCells = [[3,0]];
    }

    about(): string {
        return 'figure I'
    }

    moved(direction: string | null, board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            cell?.changeColor(ColorsEnum.DEFAULT);
            cell?.changeEmpty(true)
        })
        
        if(direction === 'right'){
            this.downCells.forEach((item) => item[0]+=1);
            this.rightCells.forEach((item) => item[0]+=1);
            this.leftCells.forEach((item) => item[0]+=1);
            this.figureForm.forEach((item) => {
                item[0]+=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else if(direction === 'left'){
            this.downCells.forEach((item) => item[0]-=1)
            this.rightCells.forEach((item) => item[0]-=1)
            this.leftCells.forEach((item) => item[0]-=1)
            this.figureForm.forEach((item) => {
                item[0]-=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else {
            this.downCells.forEach((item) => item[1]+=1)
            this.rightCells.forEach((item) => item[1]+=1)
            this.leftCells.forEach((item) => item[1]+=1)
            this.figureForm.forEach((item) => {
                item[1]+=1;
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            })
            
        }
    }

    move(board: IBoard){

        if(this.nextTickMoveDerection){
            if(this.nextTickMoveDerection === "right"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.rightCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x < 9) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.rightCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x + 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }

                    })
                } 

                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            } else if (this.nextTickMoveDerection === "left"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.leftCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x > 0) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.leftCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x - 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }
                    })
                }
                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            }
            this.nextTickMoveDerection = null;
        } else {
            this.moved(this.nextTickMoveDerection, board);
        }
    }

    canMoveDown(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }

    moveRight(){
        this.nextTickMoveDerection = 'right'
    }

    moveLeft(){
        this.nextTickMoveDerection = 'left'
    }
    
}

class Figura_O implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.PURPLE
    figureForm :number[][];
    downCells: number[][];
    rightCells: number[][];
    leftCells: number[][];
    nextTickMoveDerection: string | null = null;

    constructor(){
        this.figureForm = [
            [4,0],[5,0],
            [4,1],[5,1]
        ];
        this.downCells = [[4,1],[5,1]];
        this.rightCells = [[5,0], [5,1]];
        this.leftCells = [[4,0], [4,1]];
    }

    about(): string {
        return 'figure O'
    }

    moved(direction: string | null, board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            cell?.changeColor(ColorsEnum.DEFAULT);
            cell?.changeEmpty(true)
        })
        
        if(direction === 'right'){
            this.downCells.forEach((item) => item[0]+=1);
            this.rightCells.forEach((item) => item[0]+=1);
            this.leftCells.forEach((item) => item[0]+=1);
            this.figureForm.forEach((item) => {
                item[0]+=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else if(direction === 'left'){
            this.downCells.forEach((item) => item[0]-=1)
            this.rightCells.forEach((item) => item[0]-=1)
            this.leftCells.forEach((item) => item[0]-=1)
            this.figureForm.forEach((item) => {
                item[0]-=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else {
            this.downCells.forEach((item) => item[1]+=1)
            this.rightCells.forEach((item) => item[1]+=1)
            this.leftCells.forEach((item) => item[1]+=1)
            this.figureForm.forEach((item) => {
                item[1]+=1;
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            })
            
        }
    }

    move(board: IBoard){

        if(this.nextTickMoveDerection){
            if(this.nextTickMoveDerection === "right"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.rightCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x < 9) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.rightCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x + 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }

                    })
                } 

                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            } else if (this.nextTickMoveDerection === "left"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.leftCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x > 0) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.leftCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x - 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }
                    })
                }
                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            }
            this.nextTickMoveDerection = null;
        } else {
            this.moved(this.nextTickMoveDerection, board);
        }
    }

    canMoveDown(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }

    moveRight(){
        this.nextTickMoveDerection = 'right'
    }
    moveLeft(){
        this.nextTickMoveDerection = 'left'
    }
}

class Figura_T implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.YELLOW
    figureForm :number[][];
    downCells: number[][];
    rightCells: number[][];
    leftCells: number[][];
    nextTickMoveDerection: string | null = null;

    constructor(){
        this.figureForm = [ 
            [4,0],
            [4,1],[5,1],
            [4,2]
        ];
        this.downCells = [[5,1], [4,2]];
        this.rightCells = [[4,0], [4,2], [5,1]];
        this.leftCells = [[4,0], [4,1], [4,2]];
    }

    about(): string {
        return 'figure T'
    }

    moved(direction: string | null, board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            cell?.changeColor(ColorsEnum.DEFAULT);
            cell?.changeEmpty(true)
        })
        
        if(direction === 'right'){
            this.downCells.forEach((item) => item[0]+=1);
            this.rightCells.forEach((item) => item[0]+=1);
            this.leftCells.forEach((item) => item[0]+=1);
            this.figureForm.forEach((item) => {
                item[0]+=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else if(direction === 'left'){
            this.downCells.forEach((item) => item[0]-=1)
            this.rightCells.forEach((item) => item[0]-=1)
            this.leftCells.forEach((item) => item[0]-=1)
            this.figureForm.forEach((item) => {
                item[0]-=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else {
            this.downCells.forEach((item) => item[1]+=1)
            this.rightCells.forEach((item) => item[1]+=1)
            this.leftCells.forEach((item) => item[1]+=1)
            this.figureForm.forEach((item) => {
                item[1]+=1;
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            })
            
        }
    }

    move(board: IBoard){

        if(this.nextTickMoveDerection){
            if(this.nextTickMoveDerection === "right"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.rightCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x < 9) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.rightCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x + 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }

                    })
                } 

                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            } else if (this.nextTickMoveDerection === "left"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.leftCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x > 0) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.leftCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x - 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }
                    })
                }
                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            }
            this.nextTickMoveDerection = null;
        } else {
            this.moved(this.nextTickMoveDerection, board);
        }
    }

    canMoveDown(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }

    moveRight(){
        this.nextTickMoveDerection = 'right'
    }
    moveLeft(){
        this.nextTickMoveDerection = 'left'
    }
}

class Figura_L implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.RED
    figureForm :number[][];
    downCells: number[][];
    rightCells: number[][];
    leftCells: number[][];
    nextTickMoveDerection: string | null = null;

    constructor(){
        this.figureForm = [
            [4,0], [5,0], 
                   [5,1],
                   [5,2]
        ];
        this.downCells = [[4,0], [5,2]];
        this.rightCells = [[5,0], [5,1], [5,2]];
        this.leftCells = [[4,0], [5,1], [5,2]];
    }

    about(): string {
        return 'figure L'
    }

    moved(direction: string | null, board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            cell?.changeColor(ColorsEnum.DEFAULT);
            cell?.changeEmpty(true)
        })
        
        if(direction === 'right'){
            this.downCells.forEach((item) => item[0]+=1);
            this.rightCells.forEach((item) => item[0]+=1);
            this.leftCells.forEach((item) => item[0]+=1);
            this.figureForm.forEach((item) => {
                item[0]+=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else if(direction === 'left'){
            this.downCells.forEach((item) => item[0]-=1)
            this.rightCells.forEach((item) => item[0]-=1)
            this.leftCells.forEach((item) => item[0]-=1)
            this.figureForm.forEach((item) => {
                item[0]-=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else {
            this.downCells.forEach((item) => item[1]+=1)
            this.rightCells.forEach((item) => item[1]+=1)
            this.leftCells.forEach((item) => item[1]+=1)
            this.figureForm.forEach((item) => {
                item[1]+=1;
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            })
            
        }
    }

    move(board: IBoard){

        if(this.nextTickMoveDerection){
            if(this.nextTickMoveDerection === "right"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.rightCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x < 9) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.rightCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x + 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }

                    })
                } 

                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            } else if (this.nextTickMoveDerection === "left"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.leftCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x > 0) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.leftCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x - 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }
                    })
                }
                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            }
            this.nextTickMoveDerection = null;
        } else {
            this.moved(this.nextTickMoveDerection, board);
        }
    }

    canMoveDown(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }

    moveRight(){
        this.nextTickMoveDerection = 'right'
    }
    moveLeft(){
        this.nextTickMoveDerection = 'left'
    }
}

class Figura_J implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.ORANGE
    figureForm :number[][];
    downCells: number[][];
    rightCells: number[][];
    leftCells: number[][];
    nextTickMoveDerection: string | null = null;

    constructor(){
        this.figureForm = [
            [4,0], [5,0], 
            [4,1], 
            [4,2]
        ];
        this.downCells = [[5,0], [4,2]];
        this.rightCells = [[5,0], [4,1], [4,2]];
        this.leftCells = [[4,0], [4,1], [4,2]];
    }

    about(): string {
        return 'figure J'
    }

    moved(direction: string | null, board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            cell?.changeColor(ColorsEnum.DEFAULT);
            cell?.changeEmpty(true)
        })
        
        if(direction === 'right'){
            this.downCells.forEach((item) => item[0]+=1);
            this.rightCells.forEach((item) => item[0]+=1);
            this.leftCells.forEach((item) => item[0]+=1);
            this.figureForm.forEach((item) => {
                item[0]+=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else if(direction === 'left'){
            this.downCells.forEach((item) => item[0]-=1)
            this.rightCells.forEach((item) => item[0]-=1)
            this.leftCells.forEach((item) => item[0]-=1)
            this.figureForm.forEach((item) => {
                item[0]-=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else {
            this.downCells.forEach((item) => item[1]+=1)
            this.rightCells.forEach((item) => item[1]+=1)
            this.leftCells.forEach((item) => item[1]+=1)
            this.figureForm.forEach((item) => {
                item[1]+=1;
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            })
            
        }
    }

    move(board: IBoard){

        if(this.nextTickMoveDerection){
            if(this.nextTickMoveDerection === "right"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.rightCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x < 9) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.rightCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x + 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }

                    })
                } 

                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            } else if (this.nextTickMoveDerection === "left"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.leftCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x > 0) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.leftCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x - 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }
                    })
                }
                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            }
            this.nextTickMoveDerection = null;
        } else {
            this.moved(this.nextTickMoveDerection, board);
        }
    }

    canMoveDown(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }

    moveRight(){
        this.nextTickMoveDerection = 'right'
    }
    moveLeft(){
        this.nextTickMoveDerection = 'left'
    }
}

class Figura_Z implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.BLUE
    figureForm :number[][];
    downCells: number[][];
    rightCells: number[][];
    leftCells: number[][];
    nextTickMoveDerection: string | null = null;

    constructor(){
        this.figureForm = [
                   [5,0],
            [4,1], [5,1], 
            [4,2]
        ];
        this.downCells = [[5,1],[4,2]];
        this.rightCells = [[5,0], [5,1], [4,2]];
        this.leftCells = [[5,0], [4,1], [4,2]];
    }

    about(): string {
        return 'figure Z'
    }

    moved(direction: string | null, board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            cell?.changeColor(ColorsEnum.DEFAULT);
            cell?.changeEmpty(true)
        })
        
        if(direction === 'right'){
            this.downCells.forEach((item) => item[0]+=1);
            this.rightCells.forEach((item) => item[0]+=1);
            this.leftCells.forEach((item) => item[0]+=1);
            this.figureForm.forEach((item) => {
                item[0]+=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else if(direction === 'left'){
            this.downCells.forEach((item) => item[0]-=1)
            this.rightCells.forEach((item) => item[0]-=1)
            this.leftCells.forEach((item) => item[0]-=1)
            this.figureForm.forEach((item) => {
                item[0]-=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else {
            this.downCells.forEach((item) => item[1]+=1)
            this.rightCells.forEach((item) => item[1]+=1)
            this.leftCells.forEach((item) => item[1]+=1)
            this.figureForm.forEach((item) => {
                item[1]+=1;
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            })
            
        }
    }

    move(board: IBoard){

        if(this.nextTickMoveDerection){
            if(this.nextTickMoveDerection === "right"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.rightCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x < 9) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.rightCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x + 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }

                    })
                } 

                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            } else if (this.nextTickMoveDerection === "left"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.leftCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x > 0) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.leftCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x - 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }
                    })
                }
                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            }
            this.nextTickMoveDerection = null;
        } else {
            this.moved(this.nextTickMoveDerection, board);
        }
    }

    canMoveDown(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }

    moveRight(){
        this.nextTickMoveDerection = 'right'
    }

    moveLeft(){
        this.nextTickMoveDerection = 'left'
    }
}

class Figura_S implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.GREY
    figureForm :number[][];
    downCells: number[][];
    rightCells: number[][];
    leftCells: number[][];
    nextTickMoveDerection: string | null = null;

    constructor(){
        this.figureForm = [
            [4,0],
            [4,1],[5,1],
                  [5,2]
        ];
        this.downCells = [[4,1], [5,2]];
        this.rightCells = [[4,0], [5,1], [5,2]];
        this.leftCells = [[4,0], [4,1], [5,2]];
    }

    about(): string {
        return 'figure S'
    }

    moved(direction: string | null, board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            cell?.changeColor(ColorsEnum.DEFAULT);
            cell?.changeEmpty(true)
        })
        
        if(direction === 'right'){
            this.downCells.forEach((item) => item[0]+=1);
            this.rightCells.forEach((item) => item[0]+=1);
            this.leftCells.forEach((item) => item[0]+=1);
            this.figureForm.forEach((item) => {
                item[0]+=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else if(direction === 'left'){
            this.downCells.forEach((item) => item[0]-=1)
            this.rightCells.forEach((item) => item[0]-=1)
            this.leftCells.forEach((item) => item[0]-=1)
            this.figureForm.forEach((item) => {
                item[0]-=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else {
            this.downCells.forEach((item) => item[1]+=1)
            this.rightCells.forEach((item) => item[1]+=1)
            this.leftCells.forEach((item) => item[1]+=1)
            this.figureForm.forEach((item) => {
                item[1]+=1;
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            })
            
        }
    }

    move(board: IBoard){

        if(this.nextTickMoveDerection){
            if(this.nextTickMoveDerection === "right"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.rightCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x < 9) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.rightCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x + 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }

                    })
                } 

                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            } else if (this.nextTickMoveDerection === "left"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.leftCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x > 0) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.leftCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x - 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }
                    })
                }
                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            }
            this.nextTickMoveDerection = null;
        } else {
            this.moved(this.nextTickMoveDerection, board);
        }
    }

    canMoveDown(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }

    moveRight(){
        this.nextTickMoveDerection = 'right'
    }

    moveLeft(){
        this.nextTickMoveDerection = 'left'
    }
}

class Figura_D implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.VIOLET
    figureForm :number[][];
    downCells: number[][];
    rightCells: number[][];
    leftCells: number[][];
    nextTickMoveDerection: string | null = null;

    constructor(){
        this.figureForm = [[4,0]];
        this.downCells = [[4,0]];
        this.rightCells = [[4,0]];
        this.leftCells = [[4,0]];
    }

    about(): string {
        return 'figure D'
    }

    moved(direction: string | null, board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            cell?.changeColor(ColorsEnum.DEFAULT);
            cell?.changeEmpty(true)
        })
        
        if(direction === 'right'){
            this.downCells.forEach((item) => item[0]+=1);
            this.rightCells.forEach((item) => item[0]+=1);
            this.leftCells.forEach((item) => item[0]+=1);
            this.figureForm.forEach((item) => {
                item[0]+=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else if(direction === 'left'){
            this.downCells.forEach((item) => item[0]-=1)
            this.rightCells.forEach((item) => item[0]-=1)
            this.leftCells.forEach((item) => item[0]-=1)
            this.figureForm.forEach((item) => {
                item[0]-=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        } else {
            this.downCells.forEach((item) => item[1]+=1)
            this.rightCells.forEach((item) => item[1]+=1)
            this.leftCells.forEach((item) => item[1]+=1)
            this.figureForm.forEach((item) => {
                item[1]+=1;
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            })
            
        }
    }

    move(board: IBoard){

        if(this.nextTickMoveDerection){
            if(this.nextTickMoveDerection === "right"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.rightCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x < 9) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.rightCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x + 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }

                    })
                } 

                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            } else if (this.nextTickMoveDerection === "left"){
                let isCanMove: boolean = false
                let isFind: boolean = false

                this.leftCells.forEach(([x, y]) => {
                    if(!isFind){
                        if(x > 0) {
                            isCanMove = true;
                        } else{
                            isCanMove = false;
                            isFind = true
                        }
                    }
                })
                if(isCanMove){
                    let isFind: boolean = false
                    this.leftCells.forEach(([x, y]) => {
                        if(!isFind){
                            if(board.getCell([x - 1, y])?.isEmpty){
                                isCanMove = true;
                            } else {
                                isCanMove = false;
                                isFind = true;
                            }
                        }
                    })
                }
                if(isCanMove){
                    this.moved(this.nextTickMoveDerection, board);
                }
            }
            this.nextTickMoveDerection = null;
        } else {
            this.moved(this.nextTickMoveDerection, board);
        }
    }

    canMoveDown(board: IBoard){
        const finishToBoard = this.downCells.some((item) => item[1] > 18 || board.cells[item[1]+1][item[0]].isEmpty === false)
        return !finishToBoard 
    }

    moveRight(){
        this.nextTickMoveDerection = 'right'
    }

    moveLeft(){
        this.nextTickMoveDerection = 'left'
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




 /* let isCanMove: boolean = false
                
    this.rightCells.forEach(([x,y]) =>  x < 8 ? isCanMove = true : false)
    if(isCanMove){
        this.rightCells.forEach(([x,y]) =>  {
            board.getCell([x+1, y])?.isEmpty ? isCanMove = true : false
        })
    } */