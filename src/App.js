import React, { Component } from 'react';
import GameBoard from './components/GameBoard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <GameBoard />
        </div>
      </div>
    );
  }
}

export default App;
