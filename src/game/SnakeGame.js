import { GameStatus, Key } from './constants';
import Board from './Board';
import Snake, { SnakeStatus } from './Snake';
import Food from './Food';

class SnakeGame {
  constructor(gameCallback) {
    this.timer = null;
    this.gameCallback = gameCallback;
    this.running = this.running.bind(this);
    this.gameInit();
  }

  gameInit() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.gameStatus = GameStatus.INIT;
    this.board = new Board();
    this.snake = new Snake(this.board);
    this.food = Food.generate(this.board);
    this.speed = 10;
    this.score = 0;
    this.highestScore = localStorage.getItem('highestscore') || 0;
    this.lastScore = localStorage.getItem('lastscore') || 0;
    this.gameInfo = {
      status: this.gameStatus,
      snake: this.snake.body,
      food: this.food,
      speed: this.speed,
      score: this.score,
      highestScore: this.highestScore,
      lastScore: this.lastScore,
    };
  }

  gameOver() {
    if (this.highestScore < this.score) {
      localStorage.setItem('highestscore', this.score);
    }
    localStorage.setItem('lastscore', this.score);
    this.gameInit();
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
        if (key !== Key.SPACE) return;
        this.gameStatus = GameStatus.PLAYING;
        this.snake.play();
        this.setSpeed();
        break;
      case GameStatus.PLAYING:
        this.snake.command(key);
        break;
      default:
        break;
    }
  }

  running() {
    if (this.snake === null) return;

    const snakeStatus = this.snake.move(this.food);
    if (snakeStatus === SnakeStatus.DEAD) {
      this.gameOver();
    } else if (snakeStatus === SnakeStatus.FOODEATEN) {
      this.addScore();
      this.food = Food.generate(this.board);
    }
    this.updateGameInfo();
  }

  updateGameInfo() {
    const snake = (this.snake) ? this.snake.body : [];
    this.gameInfo = Object.assign(this.gameInfo, {
      status: this.gameStatus,
      food: this.food,
      snake,
      speed: this.speed,
      score: this.score,
    });
    this.gameCallback();
  }
}

export default SnakeGame;
