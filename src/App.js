import React from 'react';
import logo from './logo.svg';
import './App.scss';
import LeftMenu from "./components/LeftMenu";

function App() {
  return (
    <div className="App">
      <LeftMenu />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
