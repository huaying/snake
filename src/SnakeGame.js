const Key = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
}

class Snake {
  constructor(board) {
    this.direction = Key.RIGHT;
    this.board = board;
    this.body = [{x: 0, y: 0}]
  }

  changeDirection(direction) {
    this.direction = direction
  }

  moveAndEat(food) {
    const currentPos = this.body[0];
    let isEaten = false;
    let newPos;
    switch (this.direction) {
      case Key.UP:
        newPos = {
          x: currentPos.x,
          y: (currentPos.y - 1 + this.board.rows) % this.board.rows
        };
        break;
      case Key.DOWN:
        newPos = {
          x: currentPos.x,
          y: (currentPos.y + 1) % this.board.rows
        };
        break;
      case Key.LEFT:
        newPos = {
          x: (currentPos.x - 1 + this.board.columns) % this.board.columns,
          y: currentPos.y
        };
        break;
      case Key.RIGHT:
        newPos = {
          x: (currentPos.x + 1) % this.board.columns,
          y: currentPos.y
        };
        break;
      default:
        return;
    }
    if (food.x === newPos.x && food.y === newPos.y) {
      isEaten = true;
    } else {
      this.body.pop();
    }
    this.body = [newPos, ...this.body];
    return isEaten;
  }
}

const Food = {
  generate: (board) => ({
      x: Math.floor(board.columns * Math.random()),
      y: Math.floor(board.rows * Math.random()),
  })
}

const GameStatus = {
  INIT: 'INIT',
  PLAYING: 'PLAYING',
  END: 'END'
}

const BoardSize = {
  columns: 60,
  rows: 30
}

class SnakeGame {
  constructor(gameCallback) {
    this.timer = null;
    this.timerPeriod = 100;
    this.gameStatus = GameStatus.INIT;
    this.gameInfo = {
      status: this.gameStatus,
      snake: null
    }
    this.board = BoardSize;
    this.gameCallback = gameCallback;
    this.running = this.running.bind(this);
  }

  gameSetup() {
    this.snake = new Snake(this.board);
    this.food = Food.generate(this.board);
    this.timer = setInterval(this.running, this.timerPeriod);
  }

  action(key) {
    switch (this.gameStatus) {
      case GameStatus.INIT:
        this.gameStatus = GameStatus.PLAYING;
        this.gameSetup();
        break;
      case GameStatus.PLAYING:
        this.snake.changeDirection(key);
      default:
        break;
    }
  }

  running() {
    const isEaten = this.snake.moveAndEat(this.food);
    if (isEaten) {
      this.food = Food.generate(this.board)
    }
    this.updateGameInfo();
  }

  updateGameInfo() {
    const snake = (this.snake) ? this.snake.body : null;
    this.gameInfo = {
      status: this.gameStatus,
      food: this.food,
      snake: snake
    }
    this.gameCallback();
  }
}

export default SnakeGame
