import { BoardSize } from './constants';
import { make2DArray } from '../helper';

export const BoardInfo = {
  EMPTY: 0,
  SNAKE: 1,
  FOOD: 2,
};

class Board {
  constructor() {
    this.columns = BoardSize.columns;
    this.rows = BoardSize.rows;
    this.boardInit();
  }

  boardInit() {
    this.snake = new Set();
    this.info = make2DArray(this.columns, this.rows, BoardInfo.EMPTY);
  }

  updateSnake(snakePart, add) {
    const strSnakePart = [snakePart.x, snakePart.y].toString();
    if (add) {
      this.snake.add(strSnakePart);
      this.info[snakePart.x][snakePart.y] = BoardInfo.SNAKE;
    } else {
      this.snake.delete(strSnakePart);
      this.info[snakePart.x][snakePart.y] = BoardInfo.EMPTY;
    }
  }

  getValidPos() {
    const range = this.columns * this.rows - this.snake.size;
    const rndIndex = Math.floor(range * Math.random());
    let cur = 0;
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (!this.snake.has([i, j].toString())) {
          if (cur === rndIndex) {
            return { x: i, y: j };
          }
          cur++;
        }
      }
    }
    return null;
  }

}

export default Board;
