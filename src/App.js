import React, { Component } from 'react';
import GameBoard from './components/GameBoard'
import './App.css';
import KeyEsc from './assets/Esc.svg';
import KeySpace from './assets/Space.svg';
import KeyArrow from './assets/Arrow.svg';

const Nav = () => (
  <div className="nav">
    <span className="brand">Snake Game</span>
  </div>
);

const Footer = () => (
  <div className="footer">
    Copyright © 2016 Huaying. All Rights Reserved
  </div>
);

const GameIntro = () => (
  <div className="game-intro">
    <div>
      <img src={KeyEsc} />
      <div>Pause</div>
    </div>
    <div>
      <img src={KeySpace} />
      <div>Start</div>
    </div>
    <div>
      <img src={KeyArrow} />
      <div>Move</div>
    </div>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="app">
        <Nav />
        <GameBoard />
        <GameIntro />
        <Footer />
      </div>
    );
  }
}

export default App;
