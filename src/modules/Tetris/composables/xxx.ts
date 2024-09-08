import { ColorsEnum, DegEnum } from "./types";
import type { IBoard, IFigures } from "./types";

class Figura implements IFigures {
    color: ColorsEnum = ColorsEnum.DEFAULT;
    degree: DegEnum = DegEnum.DEFAULT;
    figureForm: number[][] = [];
    downCells: number[][] = [];
    rightCells: number[][] = [];
    leftCells: number[][] = [];
    name: string = '';
    nextTickMoveDirection: string | DegEnum | null = null;

    about() {
        return {
            name: this.name,
            degree: this.degree,
            form: this.figureForm,
            color: this.color,
            leftCells: this.leftCells,
            rightCells: this.rightCells,
            downCells: this.downCells,
        };
    }

    clearFigurePositionOnBoard(board: IBoard) {
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item);
            if (cell) {
                cell.changeColor(ColorsEnum.DEFAULT);
                cell.changeEmpty(true);
            }
        });
    }

    setFigurePositionOnBoard(board: IBoard) {
        this.figureForm.forEach((item) => {
            const cell = board.getCell(item);
            if (cell) {
                cell.changeColor(this.color);
                cell.changeEmpty(false);
            }
        });
    }

    moveFigure(deltaX: number, deltaY: number, board: IBoard) {
        this.figureForm.forEach((item) => {
            item[0] += deltaX;
            item[1] += deltaY;
        });
        this.updateCells(deltaX, deltaY);
        this.setFigurePositionOnBoard(board);
    }

    updateCells(deltaX: number, deltaY: number) {
        this.downCells.forEach((item) => {
            item[0] += deltaX;
            item[1] += deltaY;
        });
        this.rightCells.forEach((item) => {
            item[0] += deltaX;
            item[1] += deltaY;
        });
        this.leftCells.forEach((item) => {
            item[0] += deltaX;
            item[1] += deltaY;
        });
    }

    checkMoveDirection(board: IBoard) {
        if (!this.nextTickMoveDirection) {
            this.moveFigure(0, 1, board); // Move down by default if no direction
            return;
        }

        const moveOffsets = {
            right: { dx: 1, dy: 0, checkCells: this.rightCells, limit: 9 },
            left: { dx: -1, dy: 0, checkCells: this.leftCells, limit: 0 },
        };

        const direction = this.nextTickMoveDirection as string;
        const movement = moveOffsets[direction];

        if (movement) {
            const canMove = movement.checkCells.every(([x]) => (direction === 'right' ? x < movement.limit : x > movement.limit));
            const nextMoveValid = movement.checkCells.every(([x, y]) => board.getCell([x + movement.dx, y])?.isEmpty);

            if (canMove && nextMoveValid) {
                this.moveFigure(movement.dx, movement.dy, board);
            }
        } else if (this.nextTickMoveDirection === DegEnum.ONE) {
            this.rotate(DegEnum.ONE, board);
        }

        this.nextTickMoveDirection = null;
    }

    moveRight() {
        this.nextTickMoveDirection = 'right';
    }

    moveLeft() {
        this.nextTickMoveDirection = 'left';
    }

    moveDeg(deg: DegEnum) {
        this.nextTickMoveDirection = deg;
    }

    rotate(deg: DegEnum, board: IBoard): void {
        // To be implemented per figure subclass
    }

    canMoveDown(board: IBoard): boolean {
        return this.downCells.every(([x, y]) => y < 19 && board.getCell([x, y + 1])?.isEmpty);
    }
}
