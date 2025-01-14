import {ColorsEnum, DegEnum} from "./types"
import type { IBoard, IFigures } from "./types"

class Figura implements IFigures {
    color: ColorsEnum = ColorsEnum.DEFAULT;
    degree: DegEnum = DegEnum.DEFAULT;
    figureForm: number[][] = [];
    downCells: number[][] = [];
    rightCells: number[][] = [];
    leftCells: number[][] = [];
    name: string = '';

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
    }

    clearFigurePositionOnBoard(board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            if(cell){
                cell.changeColor(ColorsEnum.DEFAULT);
                cell.changeEmpty(true);
            }
        })
    }

    setFigurePositionOnBoard(board: IBoard){
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item)
            if (cell) {
                cell.changeColor(this.color);
                cell.changeEmpty(false);
            }
        })
    }

    changeRotationCells(figure: number[][],one:number[],two:number[],three:number[],four:number[]){
        return [
            [figure[0][0]+one[0], figure[0][1]+one[1]],
            [figure[1][0]+two[0], figure[1][1]+two[1]],
            [figure[2][0]+three[0], figure[2][1]+three[1]],
            [figure[3][0]+four[0], figure[3][1]+four[1]]
        ]
    }

    movingDown(board: IBoard){
        this.clearFigurePositionOnBoard(board)
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

    moveRight(board: IBoard){
        let isCanMove: boolean = false
        let isFind: boolean = false

        this.rightCells.forEach(([x]) => {
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
            this.downCells.forEach((item) => item[0]+=1);
            this.rightCells.forEach((item) => item[0]+=1);
            this.leftCells.forEach((item) => item[0]+=1);
            this.figureForm.forEach((item) => {
                item[0]+=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        }
    }

    moveLeft(board: IBoard){
        let isCanMove: boolean = false
        let isFind: boolean = false

        this.leftCells.forEach(([x]) => {
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
            this.downCells.forEach((item) => item[0]-=1)
            this.rightCells.forEach((item) => item[0]-=1)
            this.leftCells.forEach((item) => item[0]-=1)
            this.figureForm.forEach((item) => {
                item[0]-=1
                const cell = board.getCell(item)
                cell?.changeColor(this.color);
                cell?.changeEmpty(false)
            });
        }
    }

    rotate(deg: DegEnum, board: IBoard): void{deg; board}

    rotateDeg(deg: DegEnum, board: IBoard): void {
        if(this.name !== 'O' && this.name !== 'D'){
            this.clearFigurePositionOnBoard(board)
            this.rotate(deg, board)
        }
    }

    canMoveDown = (board: IBoard) => this.downCells.every(([x, y]) => y < 19 && board.getCell([x, y + 1])?.isEmpty);
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
        let newForm: number[][] = [];
    
        if (deg === DegEnum.ONE || deg === DegEnum.THREE) {
            newForm = this.changeRotationCells(this.figureForm, [1,0], [0,1], [-1,2], [-2,3])
        } else {
            newForm = this.changeRotationCells(this.figureForm,[-1,0], [0,-1], [1,-2], [2,-3])
        }

        const isValid = newForm.every(([x, y]) => {
            return x >= 0 && x <= 9 && y >= 0 && y <= 19 && board.getCell([x, y])?.isEmpty;
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
        this.degree = deg;
    }
}

class Figura_O extends Figura {
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

class Figura_T extends Figura {
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
        let newForm: number[][] = [];

        if (deg === DegEnum.ONE) {

           /*   
            [4,1],[5,1],[6,1],
                  [5,2]
            */
            newForm = this.changeRotationCells(this.figureForm,[0,1], [1,0], [1,0], [1,0])
            
        } else if(deg === DegEnum.TWO) {

            /* 
                 [5,1]
            [4,2][5,2]
                 [5,3]
            */
            newForm = this.changeRotationCells(this.figureForm,[1,0], [-1,1], [-1,1], [0,1])

        } else if(deg === DegEnum.THREE) {
             
            /* 
                      [5, 1]
                [4,2][5, 2][6,2]
             */ 
            newForm = this.changeRotationCells(this.figureForm,[0,0], [0,0], [0,0], [1,-1])  
            
        } else {  

            /*  [4,0],
                [4,1],[5,1],
                [4,2]
            */
            newForm = this.changeRotationCells(this.figureForm,[-1,-1], [0,-1], [0,-1], [-2,0])

        }

        const isValid = newForm.every(([x, y]) => {
            return x >= 0 && x <= 9 && y >= 0 && y <= 19 && board.getCell([x, y])?.isEmpty;
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
        this.degree = deg;
    }
}

class Figura_L extends Figura {
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
        let newForm: number[][] = [];

        if (deg === DegEnum.ONE) {
           /*   
                        [6,0]
              [4,1][5,1][6,1]
            */
            newForm = this.changeRotationCells(this.figureForm,[2,0], [-1,1], [0,0], [1,-1])
            
        } else if(deg === DegEnum.TWO) {
            /* 
                [4,1]
                [4,2]
                [4,3][5,3]
            */
            newForm = this.changeRotationCells(this.figureForm,[-2,1], [0,1], [-1,2], [-1,2])
    
        } else if(deg === DegEnum.THREE) {
            /* 
                [4,2][5,2][6,2]
                [4,3]
             */
            newForm = this.changeRotationCells(this.figureForm,[0,1], [1,0], [2,-1], [-1,0])   
            
        } else {
             /*     
                [4,1][5,1]
                     [5,2]
                     [5,3]
            */
            newForm = this.changeRotationCells(this.figureForm,[0,-1], [0,-1], [-1,0], [1,0])   

        }

        const isValid = newForm.every(([x, y]) => {
            return x >= 0 && x <= 9 && y >= 0 && y <= 19 && board.getCell([x, y])?.isEmpty;
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
        this.degree = deg;
    }
}

class Figura_J extends Figura {
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

    rotate(deg: DegEnum, board: IBoard): void {
        let newForm: number[][] = [];

        if (deg === DegEnum.ONE) {
           /*   
            [3,0][4,0][5,0]
                      [5,1]
            */
            newForm = this.changeRotationCells(this.figureForm,[-1,0], [-1,0], [1,-1], [1,-1])   
            
        } else if(deg === DegEnum.TWO) {
            /* 
                    [5,0]
                    [5,1]
               [4,2][5,2]
            */
            newForm = this.changeRotationCells(this.figureForm,[2,0], [1,1], [-1,2], [0,1])   
    
        } else if(deg === DegEnum.THREE) {
            /* 
               [3,0]
               [3,1][4,1][5,1]
            */
            newForm = this.changeRotationCells(this.figureForm,[-2,0], [-2,0], [0,-1], [0,-1])      
            
        } else {
             /*  
                [4,0][5,0]
                [4,1]
                [4,2]
            */
            newForm = this.changeRotationCells(this.figureForm,[1,0], [2,-1], [0,0], [-1,1])   

        }

        const isValid = newForm.every(([x, y]) => {
            return x >= 0 && x <= 9 && y >= 0 && y <= 19 && board.getCell([x, y])?.isEmpty;
        });
        if (!isValid) {
            this.setFigurePositionOnBoard(board);
            console.warn("Rotation not possible, position out of bounds or blocked.");
            return;
        }

        this.figureForm =  newForm.map(item => [...item]);
        this.setFigurePositionOnBoard(board);

        if(deg === DegEnum.ONE){
            this.downCells = [[...this.figureForm[0]], [...this.figureForm[1]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[2]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[3]]];
        } else if (deg === DegEnum.TWO){
            this.downCells = [[...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[0]], [...this.figureForm[1]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[1]], [...this.figureForm[2]]];
        } else if (deg === DegEnum.THREE) {
            this.downCells = [[...this.figureForm[1]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[0]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[1]]];
        } else {
            this.downCells = [[...this.figureForm[1]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[1]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[2]], [...this.figureForm[3]]];
        }
        this.degree = deg;
    }
}

class Figura_Z extends Figura {
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

    rotate(deg: DegEnum, board: IBoard): void {
        let newForm: number[][] = [];

        if (deg === DegEnum.ONE ||  deg === DegEnum.THREE) {
           /*   
            [4,0][5,0]
                 [5,1][6,1]
            */
            newForm = this.changeRotationCells(this.figureForm,[-1,0], [1,-1], [0,0], [2,-1])   
            
        } else if(deg === DegEnum.TWO || deg === DegEnum.DEFAULT) {
            /* 
                     [5,0]
                [4,1][5,1]
                [4,2]
            */
            newForm = this.changeRotationCells(this.figureForm,[1,0], [-1,1], [0,0], [-2,1])
    
        }

        const isValid = newForm.every(([x, y]) => {
            return x >= 0 && x <= 9 && y >= 0 && y <= 19 && board.getCell([x, y])?.isEmpty;
        });
        if (!isValid) {
            this.setFigurePositionOnBoard(board);
            console.warn("Rotation not possible, position out of bounds or blocked.");
            return;
        }

        this.figureForm =  newForm.map(item => [...item]);
        this.setFigurePositionOnBoard(board);

        if(deg === DegEnum.ONE || deg === DegEnum.THREE){
            this.downCells = [[...this.figureForm[0]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[1]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[2]]];
        } else if (deg === DegEnum.TWO || deg === DegEnum.DEFAULT){
            this.downCells = [[...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[0]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[1]], [...this.figureForm[3]]];
        }
        this.degree = deg;
    }
}

class Figura_S extends Figura {
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

    rotate(deg: DegEnum, board: IBoard): void {
        let newForm: number[][] = [];

        if (deg === DegEnum.ONE ||  deg === DegEnum.THREE) {
           /*   
                 [5,0][6,0]
            [4,1][5,1]
            */
            newForm = this.changeRotationCells(this.figureForm,[1,0], [2,-1], [-1,0], [0,-1])   
            
        } else if(deg === DegEnum.TWO || deg === DegEnum.DEFAULT) {
            /* 
                [4,0]
                [4,1][5,1]
                     [5,2]
            */
            newForm = this.changeRotationCells(this.figureForm,[-1,0], [-2,1], [1,0], [0,1])
    
        }

        const isValid = newForm.every(([x, y]) => {
            return x >= 0 && x <= 9 && y >= 0 && y <= 19 && board.getCell([x, y])?.isEmpty;
        });
        if (!isValid) {
            this.setFigurePositionOnBoard(board);
            console.warn("Rotation not possible, position out of bounds or blocked.");
            return;
        }


        this.figureForm =  newForm.map(item => [...item]);
        this.setFigurePositionOnBoard(board);

        if(deg === DegEnum.ONE || deg === DegEnum.THREE){
            
            this.downCells = [[...this.figureForm[1]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[1]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[2]]];
        } else if (deg === DegEnum.TWO || deg === DegEnum.DEFAULT){
            this.downCells = [[...this.figureForm[1]], [...this.figureForm[3]]];
            this.rightCells = [[...this.figureForm[0]], [...this.figureForm[2]], [...this.figureForm[3]]];
            this.leftCells = [[...this.figureForm[0]], [...this.figureForm[1]], [...this.figureForm[3]]];
        }
        this.degree = deg;
    }
}

class Figura_D extends Figura {
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