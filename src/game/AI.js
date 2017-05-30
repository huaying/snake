import { Key } from './constants';
import { BoardInfo } from './Board';
import { make2DArray } from '../helper';

class AI {
  constructor(game) {
    this.game = game;
    this.timer = null;
    this.move = this.move.bind(this);
    this.board = this.game.board;
    this.maxPlay = this.board.columns * this.board.rows;
  }

  start() {
    this.play(this.maxPlay);
  }

  play(maxPlay) {
    if (maxPlay) {
      const path = this.bfs();
      if (path !== null) this.move(path, () => this.play(maxPlay - 1));
    }
  }

  move(path, next) {
    if (path.length > 1) {
      const direction = this.getDirection(path[0], path[1]);
      this.game.snake.command(direction);
      this.game.running();
      path.shift();
      this.timer = setTimeout(() => this.move(path, next), 20);
    } else {
      next();
    }
  }

  getDirection(from, to) {
    if (from.x > to.x) return Key.LEFT;
    if (from.x < to.x) return Key.RIGHT;
    if (from.y > to.y) return Key.UP;
    if (from.y < to.y) return Key.DOWN;
    return null;
  }

  findEmptySpots(node) {
    const result = [];
    const { x, y } = node;
    const board = this.board;
    const boardInfo = board.info;
    [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ].forEach(({ x: X, y: Y }) => {
      if (X >= 0 && X < board.columns &&
          Y >= 0 && Y < board.rows &&
          boardInfo[X][Y] === BoardInfo.EMPTY) {
        result.push({ x: X, y: Y });
      }
    });
    return result;
  }

  bfs() {
    const getPath = (node, cameFrom) => {
      let cur = node;
      const path = [node];
      while (cameFrom[cur.x][cur.y] !== null) {
        path.unshift(cameFrom[cur.x][cur.y]);
        cur = cameFrom[cur.x][cur.y];
      }
      return path;
    };
    const start = this.game.snake.body[0];
    const end = this.game.food;
    const board = this.board;
    const queue = [start];
    const visit = make2DArray(board.columns, board.rows, false);
    visit[start.x][start.y] = true;
    const cameFrom = make2DArray(board.columns, board.rows, null);

    while (queue.length > 0) {
      const node = queue.shift();
      const neighbors = this.findEmptySpots(node);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (neighbor.x === end.x && neighbor.y === end.y) {
          return [...getPath(node, cameFrom), neighbor];
        }

        if (!visit[neighbor.x][neighbor.y]) {
          visit[neighbor.x][neighbor.y] = true;
          cameFrom[neighbor.x][neighbor.y] = node;
          queue.push(neighbor);
        }
      }
    }

    return null;
  }
}

export default AI;
