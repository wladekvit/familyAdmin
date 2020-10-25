import React, {useEffect} from 'react';
import './App.scss';
import LeftMenu from "./components/LeftMenu";
import {Router} from "./pages/router";
import {BrowserRouter} from "react-router-dom";

function App() {
  
  useEffect(() => {
    // initialisationDataStore();
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <LeftMenu />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
