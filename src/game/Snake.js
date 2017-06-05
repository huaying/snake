import { Key } from './constants';

export const SnakeStatus = {
  LIVE: 'Live',
  DEAD: 'Dead',
  FOODEATEN: 'FoodEaten',
};

class Snake {
  constructor(board) {
    this.direction = Key.RIGHT;
    this.board = board;
    this.body = [{ x: 0, y: 0 }];
    this.moving = false;
  }

  play() {
    this.moving = true;
  }

  changeDirection(direction) {
    if (Math.abs(direction - this.direction) !== 2) {
      this.direction = direction;
    }
  }

  command(key) {
    switch (key) {
      case Key.UP:
      case Key.DOWN:
      case Key.LEFT:
      case Key.RIGHT:
        this.changeDirection(key);
        break;
      case Key.ESC:
        this.moving = !this.moving;
        break;
      default:
        break;
    }
  }

  getNextPos(currentPos) {
    switch (this.direction) {
      case Key.UP:
        return {
          x: currentPos.x,
          y: (currentPos.y - 1 + this.board.rows) % this.board.rows,
        };
      case Key.DOWN:
        return {
          x: currentPos.x,
          y: (currentPos.y + 1) % this.board.rows,
        };
      case Key.LEFT:
        return {
          x: (currentPos.x - 1 + this.board.columns) % this.board.columns,
          y: currentPos.y,
        };
      case Key.RIGHT:
        return {
          x: (currentPos.x + 1) % this.board.columns,
          y: currentPos.y,
        };
      default:
        return null;
    }
  }

  isFoodEaten(food, newPos) {
    return (food.x === newPos.x && food.y === newPos.y);
  }

  checkDead(newPos) {
    const body = this.body;
    return body.slice(0, body.length - 1)
      .some(pos => (newPos.x === pos.x && newPos.y === pos.y));
  }

  move(food) {
    if (!this.moving) return SnakeStatus.LIVE;

    const currentPos = this.body[0];
    const newPos = this.getNextPos(currentPos);
    if (this.checkDead(newPos)) {
      return SnakeStatus.DEAD;
    }

    const isEaten = this.isFoodEaten(food, newPos);
    if (!isEaten) {
      const partRemove = this.body.pop();
      this.board.updateSnake(partRemove, false);
    }
    this.body = [newPos, ...this.body];
    this.board.updateSnake(newPos, true);
    return (isEaten) ? SnakeStatus.FOODEATEN : SnakeStatus.LIVE;
  }

}

export default Snake;
