import { GameStatus, BoardSize } from './constants';
import Snake from './Snake';
import Food from './Food';

class SnakeGame {
  constructor(gameCallback) {
    this.timer = null;
    this.gameStatus = GameStatus.INIT;
    this.board = BoardSize;
    this.gameCallback = gameCallback;
    this.running = this.running.bind(this);
    this.snake = null;
    this.food = null;
    this.speed = 10;
    this.score = 0;

    this.gameInfo = {
      status: this.gameStatus,
      snake: [],
      food: this.food,
      speed: this.speed,
      score: this.score
    }
  }

  gameSetup() {
    this.snake = new Snake(this.board);
    this.food = Food.generate(this.board);
    this.setSpeed();
  }

  setSpeed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(this.running, 1000 / this.speed);
  }

  addScore() {
    this.score += this.speed;
  }

  action(key) {
    switch (this.gameStatus) {
      case GameStatus.INIT:
        this.gameStatus = GameStatus.PLAYING;
        this.gameSetup();
        break;
      case GameStatus.PLAYING:
        this.snake.changeDirection(key);
        break;
      default:
        break;
    }
  }

  running() {
    const isEaten = this.snake.moveAndEat(this.food);
    if (isEaten) {
      this.addScore();
      this.food = Food.generate(this.board);
    }
    this.updateGameInfo();
  }

  updateGameInfo() {
    const snake = (this.snake) ? this.snake.body : [];
    this.gameInfo = {
      status: this.gameStatus,
      food: this.food,
      snake,
      speed: this.speed,
      score: this.score,
    };
    this.gameCallback();
  }
}

export default SnakeGame;
