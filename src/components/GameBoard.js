import React, { Component } from 'react';
import './GameBoard.css';
import SnakeGame from '../SnakeGame';

const GridUnit = 10;

const Board = ({game, children}) => {
  const { columns, rows } = game.board;
  const style = {
    width: columns * GridUnit,
    height: rows * GridUnit
  }
  return (
    <div className="game-board" style={style}>
      {children}
    </div>
  )
};

const Snake = ({snake}) => (
  <div className="snakeWrapper">
    {snake && snake.map(part => {
      const style = {
        position: 'absolute',
        left: GridUnit * part.x,
        top: GridUnit * part.y,
        width: GridUnit,
        height: GridUnit,
      };
      return <div className="snake" style={style}/>;
    })}
  </div>
);

const Food = ({ food }) => {
  if (food) {
    const { x, y } = food;
    const style = {
      position: 'absolute',
      background: 'red',
      left: GridUnit * x,
      top: GridUnit * y,
      width: GridUnit,
      height: GridUnit,
    };
    return <div className="food" style={style}/>;
  }
  return null;
}

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.handleAction = this.handleAction.bind(this);
    this.gameUpdate = this.gameUpdate.bind(this)
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
    this.snakeGame.action(e.keyCode);
  }

  gameUpdate() {
    this.setState({ ...this.snakeGame.gameInfo });
  }

  render() {
    return (
      <Board game={this.snakeGame}>
        <Snake snake={this.state.snake} />
        <Food food={this.state.food} />
      </Board>
    );
  }
}

export default GameBoard;
