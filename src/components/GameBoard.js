import React, { Component } from 'react';
import './GameBoard.css';
import SnakeGame from '../SnakeGame';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.snakeGame = new SnakeGame();
    this.handleAction = this.handleAction.bind(this);
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
    this.setState({ ...this.snakeGame.gameInfo })
  }

  render() {
    return (
      <div className="game-board">
        <div className="snakeWrapper">
          {this.state.snake && this.state.snake.map(part => {
            const style = {
              position: 'absolute',
              left: 20 * part.x,
              top: 20 * part.y
            };
            console.log(part)
            return <div className="snake" style={style}/>;
          })}
        </div>
      </div>
    );
  }
}

export default GameBoard;
