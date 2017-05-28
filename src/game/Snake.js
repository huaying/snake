import { Key } from './constants';

class Snake {
  constructor(board) {
    this.direction = Key.RIGHT;
    this.board = board;
    this.body = [{ x: 0, y: 0 }];
  }

  changeDirection(direction) {
    this.direction = direction;
  }

  moveAndEat(food) {
    const currentPos = this.body[0];
    let isEaten = false;
    let newPos;
    switch (this.direction) {
      case Key.UP:
        newPos = {
          x: currentPos.x,
          y: (currentPos.y - 1 + this.board.rows) % this.board.rows,
        };
        break;
      case Key.DOWN:
        newPos = {
          x: currentPos.x,
          y: (currentPos.y + 1) % this.board.rows,
        };
        break;
      case Key.LEFT:
        newPos = {
          x: (currentPos.x - 1 + this.board.columns) % this.board.columns,
          y: currentPos.y,
        };
        break;
      case Key.RIGHT:
        newPos = {
          x: (currentPos.x + 1) % this.board.columns,
          y: currentPos.y,
        };
        break;
      default:
        return null;
    }
    if (food.x === newPos.x && food.y === newPos.y) {
      isEaten = true;
    } else {
      this.body.pop();
    }
    this.body = [newPos, ...this.body];
    console.log(this.body, food.x, food.y)
    return isEaten;
  }
}

export default Snake;
