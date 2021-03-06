import React, { Component } from 'react';
import './GameBoard.css';
import SnakeGame from '../game/SnakeGame';
import { GridUnit } from '../game/constants';
import { AI_STRATEGY } from '../game/AI';

const Board = ({ game, children }) => {
  const { columns, rows } = game.board;
  const style = {
    position: 'relative',
    width: columns * GridUnit,
    height: rows * GridUnit,
  };
  return (
    <div className="game-board-wrapper">
      <div className="game-board" style={style}>
        {children}
      </div>
    </div>
  );
};

const Snake = ({ snake }) => (
  <div className="snake-wrapper">
    {snake && snake.map((part, idx) => {
      // console.log(part.y)
      const style = {
        position: 'absolute',
        left: GridUnit * part.x,
        top: GridUnit * part.y,
        width: GridUnit,
        height: GridUnit,
      };
      if (idx === 0) style.backgroundColor = 'green';
      else if (idx === snake.length - 1) style.backgroundColor = 'blue';
      return <div key={idx} className="snake" style={style} />;
    })}
  </div>
);

const Food = ({ food }) => {
  if (food) {
    const { x, y } = food;
    // console.log(y)
    const style = {
      position: 'absolute',
      background: 'red',
      left: GridUnit * x,
      top: GridUnit * y,
      width: GridUnit,
      height: GridUnit,
    };
    return <div className="food" style={style} />;
  }
  return null;
};

const AIMode = ({ game }) => (
  <div className="ai-mode">
    <button onClick={() => game.aiPlay(AI_STRATEGY.BFS)}>AI:BFS</button>
    <button onClick={() => game.aiPlay(AI_STRATEGY.DFS)}>AI:DFS</button>
    <button onClick={() => game.aiPlay(AI_STRATEGY.SMARTSEARCH)}>AI:Smart</button>
  </div>
);

const Result = ({ highestScore, lastScore, score, length, speed}) => {
  return (
    <div className="result">
      <span>{`Hightest Score: ${highestScore}`}</span>
      <span>{`Last Score: ${lastScore}`}</span>
      <span>{`Score: ${score}`}</span>
      <span>{`Length: ${length}`}</span>
      <span>{`Speed: ${speed}`}</span>
    </div>
  );
}

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.handleAction = this.handleAction.bind(this);
    this.gameUpdate = this.gameUpdate.bind(this);
    this.snakeGame = new SnakeGame(this.gameUpdate);
    this.state = { ...this.snakeGame.gameInfo };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleAction);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleAction);
  }

  handleAction(e) {
    e.preventDefault();
    this.snakeGame.action(e.keyCode);
  }

  gameUpdate() {
    this.setState({ ...this.snakeGame.gameInfo });
  }

  render() {
    return (
      <div>
        <Board game={this.snakeGame}>
          <Snake snake={this.state.snake} />
          <Food food={this.state.food} />
        </Board>
        <Result
          highestScore={this.state.highestScore}
          lastScore={this.state.lastScore}
          score={this.state.score}
          length={this.state.snake.length}
          speed={this.state.speed}
        />
        <AIMode game={this.snakeGame} />
      </div>
    );
  }
}

export default GameBoard;
