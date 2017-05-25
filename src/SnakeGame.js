const Key = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
}

class Snake {
  constructor() {
    this.direction = Key.RIGHT;
    this.body = [{x: 0, y: 0}]
  }

  changeDirection(direction) {
    this.direction = direction
  }

  move() {
    const currentPos = this.body[0];
    let newPos;
    switch (this.direction) {
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
        return;
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
  constructor(gameCallback) {
    this.timer = null;
    this.timerPeriod = 200;
    this.gameStatus = GameStatus.INIT;
    this.gameInfo = {
      status: this.gameStatus,
      snake: null
    }
    this.gameCallback = gameCallback;
    this.running = this.running.bind(this);
  }

  action(key) {
    switch (this.gameStatus) {
      case GameStatus.INIT:
        this.gameStatus = GameStatus.PLAYING;
        this.snake = new Snake();
        this.timer = setInterval(this.running, this.timerPeriod);
        break;
      case GameStatus.PLAYING:
        this.snake.changeDirection(key);
      default:
        break;
    }
  }

  running() {
    this.snake.move();
    this.updateGameInfo();
  }

  updateGameInfo() {
    const snake = (this.snake) ? this.snake.body : null;
    this.gameInfo = {
      status: this.gameStatus,
      snake: snake
    }
    this.gameCallback();
  }
}

export default SnakeGame
