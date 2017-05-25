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
    document.addEventListener('keyup', this.handleAction);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleAction);
  }

  handleAction(e) {
    this.snakeGame.action(e.keyCode);
  }

  gameUpdate() {
    this.setState({ ...this.snakeGame.gameInfo });
  }

  render() {
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
      </div>
    );
  }
}

export default GameBoard;
