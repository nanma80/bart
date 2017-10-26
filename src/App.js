import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Favs from './Favs.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">BART Real Time Tracker</h1>
        <Favs />
      </div>
    );
  }
}

export default App;
