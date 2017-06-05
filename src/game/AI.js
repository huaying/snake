import { Key } from './constants';
import { BoardInfo } from './Board';
import { make2DArray, copy2DArray } from '../helper';

export const AI_STRATEGY = {
  BFS: 'BFS',
  DFS: 'DFS',
  SMART: 'SMART',
};
const TIME_INTERVAL = 10;

class AI {
  constructor(game, strategy) {
    this.game = game;
    this.timer = null;
    this.move = this.move.bind(this);
    this.board = this.game.board;
    this.maxPlay = Number.MAX_VALUE;
    this.strategy = strategy;
    this.findPath = this.getFindPathByStrategy();
  }

  start() {
    this.play(this.maxPlay);
  }

  play(maxPlay) {
    if (maxPlay) {
      const start = this.game.snake.body[0];
      const end = this.game.food;
      const boardInfo = this.board.info;
      const path = this.findPath(start, end, boardInfo);
      if (path !== null) this.move(path, () => this.play(maxPlay - 1));
    }
  }

  move(path, next) {
    if (path.length > 1) {
      const direction = this.getDirection(path[0], path[1]);
      this.game.snake.command(direction);
      this.game.running();
      path.shift();
      this.timer = setTimeout(() => this.move(path, next), TIME_INTERVAL);
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

  findEmptySpots(node, boardInfo) {
    const result = [];
    const { x, y } = node;
    const columns = boardInfo.length;
    const rows = boardInfo[0].length;
    [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ].forEach(({ x: X, y: Y }) => {
      if (X >= 0 && X < columns &&
          Y >= 0 && Y < rows &&
          boardInfo[X][Y] === BoardInfo.EMPTY) {
        result.push({ x: X, y: Y });
      }
    });
    return result;
  }

  getFindPathByStrategy() {
    switch (this.strategy) {
      case AI_STRATEGY.BFS:
        return this.bfs;
      case AI_STRATEGY.DFS:
        return this.dfs;
      case AI_STRATEGY.SMARTSEARCH:
        return this.smartSearch;
      default:
        return this.bfs;
    }
  }

  predict(path, boardInfo) {
    const snake = this.game.snake.body;
    const snakeRemainSize = snake.length + 1;
    const columns = boardInfo.length;
    const rows = boardInfo[0].length;
    const nextBoardInfo = make2DArray(columns, rows, BoardInfo.EMPTY);
    const snakePath = [...snake.slice().reverse(), ...path.slice(1)];

    for (let i = 0; i < snakeRemainSize; i++) {
      const pos = snakePath[snakePath.length - 1 - i];
      nextBoardInfo[pos.x][pos.y] = BoardInfo.SNAKE;
    }
    // const o = [];
    // snakePath.forEach(p => {
    //   o.push([p.x,p.y].toString());
    // });
    // const op = [];
    // path.slice(1).forEach(p => {
    //   op.push([p.x,p.y].toString());
    // });
    // const os = [];
    // snake.reverse().forEach(p => {
    //   os.push([p.x,p.y].toString());
    // });
    //
    // console.log(o,os,op,ske.length,snakePath[snakePath.length - 1],snakePath[snakePath.length - snakeRemainSize]) ;
    return {
      nextBoardInfo,
      snakeHead: snakePath[snakePath.length - 1],
      snakeTail: snakePath[snakePath.length - snakeRemainSize],
    };
  }

  getSnakeTail() {
    const snakeSize = this.game.snake.body.length;
    return this.game.snake.body[snakeSize - 1];
  }

  smartSearch(start, end, boardInfo) {
    // Test after getting food, if the snake can find the path to its tail.
    // YES: Go to the food, NO: make one step toward its tail
    const search = this.bfs.bind(this);
    const safePath = search(start, this.getSnakeTail(), boardInfo);
    // console.log(safePath);
    const path = search(start, end, boardInfo);
    if (path !== null) {
      const {
        nextBoardInfo,
        snakeHead: newStart,
        snakeTail: newEnd,
      } = this.predict(path, boardInfo);
      if (search(newStart, newEnd, nextBoardInfo) !== null) return path;
    }
    // one step forward
    return [safePath[0], safePath[1]];
  }

  bfs(start, end, boardInfo) {
    const getPath = (node, cameFrom) => {
      let cur = node;
      const path = [node];
      while (cameFrom[cur.x][cur.y] !== null) {
        path.unshift(cameFrom[cur.x][cur.y]);
        cur = cameFrom[cur.x][cur.y];
      }
      return path;
    };
    const columns = boardInfo.length;
    const rows = boardInfo[0].length;
    const queue = [start];
    const visit = make2DArray(columns, rows, false);
    visit[start.x][start.y] = true;
    const cameFrom = make2DArray(columns, rows, null);

    const boardInfoUpdated = copy2DArray(boardInfo);
    boardInfoUpdated[end.x][end.y] = BoardInfo.EMPTY;
    while (queue.length > 0) {
      const node = queue.shift();
      const neighbors = this.findEmptySpots(node, boardInfoUpdated);
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

  dfs(start, end, boardInfo) {
    const getPath = (node, cameFrom) => {
      let cur = node;
      const path = [node];
      while (cameFrom[cur.x][cur.y] !== null) {
        path.unshift(cameFrom[cur.x][cur.y]);
        cur = cameFrom[cur.x][cur.y];
      }
      return path;
    };
    const columns = boardInfo.length;
    const rows = boardInfo[0].length;
    const stack = [start];
    const visit = make2DArray(columns, rows, false);
    visit[start.x][start.y] = true;
    const cameFrom = make2DArray(columns, rows, null);

    const boardInfoUpdated = copy2DArray(boardInfo);
    boardInfoUpdated[end.x][end.y] = BoardInfo.EMPTY;
    while (stack.length > 0) {
      const node = stack.pop();
      const neighbors = this.findEmptySpots(node, boardInfoUpdated);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (neighbor.x === end.x && neighbor.y === end.y) {
          return [...getPath(node, cameFrom), neighbor];
        }

        if (!visit[neighbor.x][neighbor.y]) {
          visit[neighbor.x][neighbor.y] = true;
          cameFrom[neighbor.x][neighbor.y] = node;
          stack.push(neighbor);
        }
      }
    }
    return null;
  }
}

export default AI;
