import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import LeftMenu from "./components/LeftMenu";
import {Router} from "./pages/router";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LeftMenu />
        <Router />
      </BrowserRouter>
      
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>*/}
    </div>
  );
}

export default App;
