import { BoardSize } from './constants';

const BoardInfo = {
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
    this.info = Array(this.rows)
      .fill(Array(this.columns).fill(BoardInfo.EMPTY));
  }

  updateSnake(snakePart, add) {
    const strSnakePart = [snakePart.x, snakePart.y].toString();
    if (add) {
      this.snake.add(strSnakePart);
      this.info[snakePart.y][snakePart.x] = BoardInfo.SNAKE;
    } else {
      this.snake.delete(strSnakePart);
      this.info[snakePart.y][snakePart.x] = BoardInfo.EMPTY;
    }
  }

  getValidPos() {
    const range = this.columns * this.rows - this.snake.size;
    const rndIndex = Math.floor(range * Math.random());
    let cur = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (!this.snake.has([i, j].toString())) {
          if (cur === rndIndex) {
            return { x: j, y: i };
          }
          cur++;
        }
      }
    }
    return null;
  }

}

export default Board;
