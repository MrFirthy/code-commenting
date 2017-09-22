import React, { Component } from 'react';
import data from './docs/components.json';
import Docs from './Docs';
import Square from './components/Square';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Square text="Wubalubadubdub" />
        <Docs data={data} />
      </div>
    );
  }
}

export default App;
