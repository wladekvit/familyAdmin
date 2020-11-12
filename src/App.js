import React, { useEffect, useState } from "react";
import "./App.scss";
import LeftMenu from "./components/LeftMenu";
import { Router } from "./pages/router";
import { BrowserRouter } from "react-router-dom";
import { customEventCategory, customEventProducts } from "./utils/constans";
import getCategories from "./queries/getCategories";
import { restRequest } from "./utils/restRequest";
import StateContext from "./components/StateContext";
import { getCurrentDate } from "./utils/initialisation";

function App() {
  const [selectCurrentDate, setSelectCurrentDate] = useState(getCurrentDate());

  const changeSelectDate = (date) => {
    setSelectCurrentDate(getCurrentDate(date));
  }

  const openWebSocked = () => {
    console.log("%cOPEN WebSocked", "color: #ff00ff");
  };
  const closeWebSocked = () => {
    console.log("%cClose WebSocked", "color: #ff00ff");
  };
  const messageWebSocked = (response) => {
    console.log("%cMessage WebSocked", "color: #ff00ff", response.data);
    const categories = ["insertCategories", "editCategories", "deleteCategories"];
    const products = ["addProducts"];
    if (categories.findIndex((ob) => response.data === ob) !== -1) {
      const objParams = getCategories();
      restRequest(objParams, true).then((data) => {
        window.dispatchEvent(new CustomEvent(customEventCategory));
      });
    } else if (products.findIndex((ob) => response.data === ob) !== -1) {
      window.dispatchEvent(new CustomEvent(customEventProducts));
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.156:3004");
    ws.onopen = openWebSocked;
    ws.onclose = closeWebSocked;
    ws.onmessage = messageWebSocked;
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <LeftMenu />
        <StateContext.Provider value={{ selectDate: selectCurrentDate, changeSelectDate }}>
          <Router />
        </StateContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
