import React from "react";
import "./App.scss";
import LeftMenu from "./components/LeftMenu";
import { Router } from "./pages/router";
import { BrowserRouter } from "react-router-dom";
import ModalWrapper from "./components/ModalWrapper";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LeftMenu />
        <ModalWrapper>
          <Router />
        </ModalWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
