const Key = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
}

class Snake {
  constructor() {
    this.body = [{x: 0, y: 0}]
  }

  move(direction) {
    const currentPos = this.body[0];
    let newPos;
    switch (direction) {
      case Key.UP:
        newPos = { x: currentPos.x, y: currentPos.y - 1 }
        break;
      case Key.DOWN:
        newPos = { x: currentPos.x, y: currentPos.y + 1 }
        break;
      case Key.LEFT:
        newPos = { x: currentPos.x - 1, y: currentPos.y }
        break;
      case Key.RIGHT:
        newPos = { x: currentPos.x + 1, y: currentPos.y }
        break;
      default:
        break;
    }
    this.body.pop();
    this.body = [newPos, ...this.body];
  }
}

const GameStatus = {
  INIT: 'INIT',
  PLAYING: 'PLAYING',
  END: 'END'
}

class SnakeGame {
  constructor() {
    this.gameStatus = GameStatus.INIT;
    this.gameInfo = {
      status: this.gameStatus,
      snake: null
    }
  }

  action(key) {
    switch (this.gameStatus) {
      case GameStatus.INIT:
        this.gameStatus = GameStatus.PLAYING;
        this.snake = new Snake();
        break;
      case GameStatus.PLAYING:
        this.snake.move(key);
      default:
        break;
    }
    this.updateGameInfo()
  }

  updateGameInfo() {
    const snake = (this.snake) ? this.snake.body : null;
    this.gameInfo = {
      status: this.gameStatus,
      snake: snake
    }
  }
}

export default SnakeGame
