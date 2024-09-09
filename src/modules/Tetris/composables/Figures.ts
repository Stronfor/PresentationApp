import {ColorsEnum} from "./types"
import { DegEnum, type IBoard, type IFigures } from "./types"


class Figura implements IFigures {
    color: ColorsEnum = ColorsEnum.DEFAULT;
    degree: DegEnum = DegEnum.DEFAULT;
    figureForm: number[][] = [];
    downCells: number[][] = [];
    rightCells: number[][] = [];
    leftCells: number[][] = [];
    name: string = '';
    nextTickMoveDirection: string |  DegEnum | null = null;

    about() {
        return {
            name: this.name,
            degree: this.degree,
            form: this.figureForm,
            color: this.color,
            leftCells: this.leftCells,
            rightCells: this.rightCells,
            downCells: this.downCells
        }
    };

    clearFigurePositionOnBoard(board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            if(cell){
                cell.changeColor(ColorsEnum.DEFAULT);
                cell.changeEmpty(true);
            }
        })
    };

    setFigurePositionOnBoard(board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            if (cell) {
                cell.changeColor(this.color);
                cell.changeEmpty(false);
            }
        })
    };

    moving(direction: string | null | DegEnum, board: IBoard){
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
        } else if(typeof direction === 'number'){
           this.rotate(direction, board);
        } else {
            this.figureForm.forEach((item) => {
                item[1]+=1;
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
            this.downCells.forEach((item) => item[1]+=1);
            this.rightCells.forEach((item) => item[1]+=1);
            this.leftCells.forEach((item) => item[1]+=1);
        }
    };

    checkMoveDirection(board: IBoard){
        if(this.nextTickMoveDirection){
            if(this.nextTickMoveDirection === "right"){
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
                    this.clearFigurePositionOnBoard(board)
                    this.moving(this.nextTickMoveDirection, board);
                }
            } else if (this.nextTickMoveDirection === "left"){
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
                    this.clearFigurePositionOnBoard(board)
                    this.moving(this.nextTickMoveDirection, board);
                }
            } else if (typeof this.nextTickMoveDirection === 'number'){
                this.clearFigurePositionOnBoard(board)
                this.moving(this.nextTickMoveDirection, board);
            }
        } else {
            this.clearFigurePositionOnBoard(board)
            this.moving(null, board);
        }
        this.nextTickMoveDirection = null;
    };

    canMoveDown = (board: IBoard) => this.downCells.every(([x, y]) => y < 19 && board.getCell([x, y + 1])?.isEmpty);

    moveRight(){
        this.nextTickMoveDirection = 'right'
    };

    moveLeft(){
        this.nextTickMoveDirection = 'left'
    };

    moveDeg(deg: DegEnum) {
        if(this.name !== 'O' && this.name !== 'D')
        this.nextTickMoveDirection = deg;
    };


}

class Figura_I extends Figura {
    readonly color: ColorsEnum = ColorsEnum.GREEN

    constructor(){
        super()
        this.name = 'I';
        this.degree = DegEnum.DEFAULT;
        this.figureForm = [[3,0],[4,0],[5,0],[6,0]];
        this.downCells = [[3,0],[4,0],[5,0],[6,0]];
        this.rightCells = [[6,0]];
        this.leftCells = [[3,0]];
    }

    rotate(deg: DegEnum, board: IBoard): void {
        this.degree = deg;
        let newForm: number[][] = [];
    
        if (deg === DegEnum.ONE || deg === DegEnum.THREE) {
            newForm = [
                [this.figureForm[1][0], this.figureForm[0][1]],
                [this.figureForm[1][0], this.figureForm[0][1] + 1],
                [this.figureForm[1][0], this.figureForm[0][1] + 2],
                [this.figureForm[1][0], this.figureForm[0][1] + 3]
            ]

        } else {
            newForm = [
                [this.figureForm[1][0] - 1, this.figureForm[1][1]], // Move left
                this.figureForm[1],  // Keep the second block as the pivot
                [this.figureForm[1][0] + 1, this.figureForm[1][1]], // Move right
                [this.figureForm[1][0] + 2, this.figureForm[1][1]]  // Move right
            ];
        }

        const isValid = newForm.every(([x, y]) => {
            return x >= 0 && x < 9 && y >= 0 && y < 19 && board.getCell([x, y])?.isEmpty;
        });
    
        if (!isValid) {
            this.setFigurePositionOnBoard(board);
            console.warn("Rotation not possible, position out of bounds or blocked.");
            return;
        }
        
        this.figureForm =  newForm.map(item => [...item]);
        this.setFigurePositionOnBoard(board);
       
        if(deg === DegEnum.ONE || deg === DegEnum.THREE){
            this.downCells = [[this.figureForm[3][0],this.figureForm[3][1]]];
            this.rightCells = this.figureForm.map(item => [...item]);
            this.leftCells = this.figureForm.map(item => [...item]);
        } else {
            this.downCells = this.figureForm.map(item => [...item]);
            this.rightCells = [[...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]]];
        }
        
    }
}

class Figura_O extends Figura implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.PURPLE

    constructor(){
        super()
        this.name = 'O';
        this.degree = DegEnum.DEFAULT;
        this.figureForm = [
            [4,0],[5,0],
            [4,1],[5,1]
        ];
        this.downCells = [[4,1],[5,1]];
        this.rightCells = [[5,0], [5,1]];
        this.leftCells = [[4,0], [4,1]];
    }
}

class Figura_T extends Figura implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.YELLOW

    constructor(){
        super();
        this.name = 'T';
        this.degree = DegEnum.DEFAULT;
        this.figureForm = [ 
            [4,0],
            [4,1],[5,1],
            [4,2]
        ];
        this.downCells = [[5,1], [4,2]];
        this.rightCells = [[4,0], [4,2], [5,1]];
        this.leftCells = [[4,0], [4,1], [4,2]];
    }

    rotate(deg: DegEnum, board: IBoard): void {
        this.degree = deg;
        let newForm: number[][] = [];

        if (deg === DegEnum.ONE) {

           /*   
                [4,0],
                [4,1],[5,1],
                [4,2]

            [4,1],[5,1],[6,1],
                  [5,2]
            */
            newForm = [
                [this.figureForm[0][0], this.figureForm[0][1] + 1], //4 1
                [this.figureForm[1][0] + 1, this.figureForm[1][1]], // 5 1
                [this.figureForm[2][0] + 1, this.figureForm[2][1]], // 6 1
                [this.figureForm[3][0] + 1, this.figureForm[3][1]]  // 5 2
             ];
            
        } else if(deg === DegEnum.TWO) {

            /* 
            [4,1],[5,1],[6,1],
                  [5,2]
            
                 [5,1]
            [4,2][5,2]
                 [5,3]
            */
            newForm = [
                [this.figureForm[0][0] + 1, this.figureForm[0][1]], //5 1
                [this.figureForm[1][0] - 1, this.figureForm[1][1] + 1], // 4 2
                [this.figureForm[2][0] - 1 , this.figureForm[2][1] + 1], // 5 2
                [this.figureForm[3][0], this.figureForm[3][1] + 1]  //  5 3
            ];
    
        } else if(deg === DegEnum.THREE) {
             
            /* 
                     [5,1]
                [4,2][5,2]
                     [5,3]
                 
                      [5, 1]
                [4,2][5, 2][6,2]
             */    
            newForm = [
                [this.figureForm[0][0], this.figureForm[0][1]], //5 1
                [this.figureForm[1][0], this.figureForm[1][1]], // 4 2
                [this.figureForm[2][0], this.figureForm[2][1]], // 5 2
                [this.figureForm[3][0] + 1, this.figureForm[3][1] - 1]  //  6 2
            ];
            
        } else {
             /*     
                      [5, 1]
                [4, 2][5, 2][6,2]
             */    

                /*  [4,0],
                    [4,1],[5,1],
                    [4,2]
            */
            newForm = [
                [this.figureForm[0][0]-1, this.figureForm[0][1]-1], //4 0
                [this.figureForm[1][0], this.figureForm[1][1]-1], // 4 1
                [this.figureForm[2][0], this.figureForm[2][1]-1], // 5 1
                [this.figureForm[3][0]-2, this.figureForm[3][1]]  //4 2
            ];
        }

        const isValid = newForm.every(([x, y]) => {
            return x >= 0 && x < 9 && y >= 0 && y < 19 && board.getCell([x, y])?.isEmpty;
        });
    
        if (!isValid) {
            this.setFigurePositionOnBoard(board);
            console.warn("Rotation not possible, position out of bounds or blocked.");
            return;
        }

        this.figureForm =  newForm.map(item => [...item]);
        this.setFigurePositionOnBoard(board);

        if(deg === DegEnum.ONE){
            this.downCells = [[...this.figureForm[0]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[2]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[3]]];
        } else if (deg === DegEnum.TWO){
            this.downCells = [[...this.figureForm[1]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[0]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[1]], [...this.figureForm[3]]];
        } else if (deg === DegEnum.THREE) {
            this.downCells = [[...this.figureForm[1]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[0]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[1]]];
        } else {
            this.downCells = [[...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[0]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[1]], [...this.figureForm[3]]];
        }
    }
}

class Figura_L extends Figura implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.RED

    constructor(){
        super();
        this.name = 'L';
        this.degree = DegEnum.DEFAULT;
        this.figureForm = [
            [4,0], [5,0], 
                   [5,1],
                   [5,2]
        ];
        this.downCells = [[4,0], [5,2]];
        this.rightCells = [[5,0], [5,1], [5,2]];
        this.leftCells = [[4,0], [5,1], [5,2]];
    }

    rotate(deg: DegEnum, board: IBoard): void {
        this.degree = deg;
        let newForm: number[][] = [];

        if (deg === DegEnum.ONE) {
           /*   
                [4,0],  [5,0], 
                        [5,1],
                        [5,2]

                        [6,0]
              [4,1][5,1][6,1]
            */
            newForm = [
                [this.figureForm[0][0]+2, this.figureForm[0][1]], //6 0
                [this.figureForm[1][0]-1, this.figureForm[1][1]+1], // 4 1
                [this.figureForm[2][0], this.figureForm[2][1]], // 5 1
                [this.figureForm[3][0]+1, this.figureForm[3][1]-1]  // 6 1
             ];
            
        } else if(deg === DegEnum.TWO) {
            /* 
                        [6,0]
              [4,1][5,1][6,1]
            
                [4,1]
                [4,2]
                [4,3][5,3]
            */
            newForm = [
                [this.figureForm[0][0]-2, this.figureForm[0][1]+1], // 4 1
                [this.figureForm[1][0], this.figureForm[1][1]+1], // 4 2
                [this.figureForm[2][0]-1, this.figureForm[2][1]+2], // 4 3
                [this.figureForm[3][0]-1, this.figureForm[3][1]+2]  // 5 3
            ];
    
        } else if(deg === DegEnum.THREE) {
            /* 
                [4,1]
                [4,2]
                [4,3][5,3]
                 
                [4,2][5,2][6,2]
                [4,3]
             */    
            newForm = [
                [this.figureForm[0][0], this.figureForm[0][1]+1], // 4 2
                [this.figureForm[1][0]+1, this.figureForm[1][1]], // 5 2
                [this.figureForm[2][0]+2, this.figureForm[2][1]-1], // 6 2
                [this.figureForm[3][0]-1, this.figureForm[3][1]]  // 4 3
            ];
            
        } else {
             /*     
                [4,2][5,2][6,2]
                [4,3]
             
                [4,1][5,1]
                     [5,2]
                     [5,3]
            */
            newForm = [
                [this.figureForm[0][0], this.figureForm[0][1]-1], // 4 1
                [this.figureForm[1][0], this.figureForm[1][1]-1], // 5 1
                [this.figureForm[2][0]-1, this.figureForm[2][1]], // 5 2
                [this.figureForm[3][0]+1, this.figureForm[3][1]]  // 5 3
            ];
        }

        const isValid = newForm.every(([x, y]) => {
            return x >= 0 && x < 9 && y >= 0 && y < 19 && board.getCell([x, y])?.isEmpty;
        });
        if (!isValid) {
            this.setFigurePositionOnBoard(board);
            console.warn("Rotation not possible, position out of bounds or blocked.");
            return;
        }

        this.figureForm =  newForm.map(item => [...item]);
        this.setFigurePositionOnBoard(board);

        if(deg === DegEnum.ONE){
            this.downCells = [[...this.figureForm[1]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[0]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[1]]];
        } else if (deg === DegEnum.TWO){
            this.downCells = [[...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[0]], [...this.figureForm[1]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[1]], [...this.figureForm[2]]];
        } else if (deg === DegEnum.THREE) {
            this.downCells = [[...this.figureForm[1]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[2]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[3]]];
        } else {
            this.downCells = [[...this.figureForm[0]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[1]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[2]], [...this.figureForm[3]]];
        }
    }
}

class Figura_J extends Figura implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.ORANGE

    constructor(){
        super();
        this.name = 'J';
        this.degree = DegEnum.DEFAULT;
        this.figureForm = [
            [4,0], [5,0], 
            [4,1], 
            [4,2]
        ];
        this.downCells = [[5,0], [4,2]];
        this.rightCells = [[5,0], [4,1], [4,2]];
        this.leftCells = [[4,0], [4,1], [4,2]];
    }
}

class Figura_Z extends Figura implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.BLUE

    constructor(){
        super();
        this.name = 'Z';
        this.degree = DegEnum.DEFAULT;
        this.figureForm = [
                   [5,0],
            [4,1], [5,1], 
            [4,2]
        ];
        this.downCells = [[5,1],[4,2]];
        this.rightCells = [[5,0], [5,1], [4,2]];
        this.leftCells = [[5,0], [4,1], [4,2]];
    }
}

class Figura_S extends Figura implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.GREY

    constructor(){
        super();
        this.name = 'S';
        this.degree = DegEnum.DEFAULT;
        this.figureForm = [
            [4,0],
            [4,1],[5,1],
                  [5,2]
        ];
        this.downCells = [[4,1], [5,2]];
        this.rightCells = [[4,0], [5,1], [5,2]];
        this.leftCells = [[4,0], [4,1], [5,2]];
    }
}

class Figura_D extends Figura implements IFigures {
    readonly color: ColorsEnum = ColorsEnum.VIOLET

    constructor(){
        super();
        this.name = 'D';
        this.degree = DegEnum.DEFAULT;
        this.figureForm = [[4,0]];
        this.downCells = [[4,0]];
        this.rightCells = [[4,0]];
        this.leftCells = [[4,0]];
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