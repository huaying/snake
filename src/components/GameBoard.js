import React, { Component } from 'react';
import './GameBoard.css';
import SnakeGame from '../SnakeGame';

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
    const food = () => {
      if (this.state.food) {
        const { x, y } = this.state.food;
        const style = {
          position: 'absolute',
          background: 'red',
          left: 10 * x,
          top: 10 * y,
          width: '10px',
          height: '10px',
        };
        return <div className="food" style={style}/>;
      }
      return null;
    }
    return (
      <div className="game-board">
        <div className="snakeWrapper">
          {this.state.snake && this.state.snake.map(part => {
            const style = {
              position: 'absolute',
              left: 10 * part.x,
              top: 10 * part.y,
              width: '10px',
              height: '10px',
            };
            return <div className="snake" style={style}/>;
          })}
        </div>
        {food()}
      </div>
    );
  }
}

export default GameBoard;
