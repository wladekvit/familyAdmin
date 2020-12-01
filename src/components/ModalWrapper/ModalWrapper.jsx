import React, { Fragment, useContext, useEffect, useState } from "react";
//import PropTypes from "prop-types";
import ModalInfo from "../ModalInfo";
import { getCurrentDate } from "../../utils/initialisation";
import getCategories from "../../queries/getCategories";
import { restRequest } from "../../utils/restRequest";
import { customEventCategory, customEventProducts } from "../../utils/constans";
// import { createStore } from "../../store/createStore";
// import { rootReducer } from "../../store/rootReducer";

const ModalContext = React.createContext(null);

export const useModalContext = () => {
  return useContext(ModalContext);
}

const DEFAULT_DURATION = 5000;

// const store = createStore(rootReducer, {units: [], categories: []});

const ModalWrapper = ({ children }) => {

  const [selectCurrentDate, setSelectCurrentDate] = useState(getCurrentDate());
  const [isOpen, setIsOpen] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [successModal, setSuccessModal] = useState(true);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);

  const openWebSocked = () => {
    console.log("%cOPEN WebSocked", "color: #ff00ff");
  };
  const closeWebSocked = () => {
    console.log("%cClose WebSocked", "color: #ff00ff");
  };
  const messageWebSocked = (response) => {
    console.log("%cMessage WebSocked", "color: #ff00ff", response.data);
    const categories = ["insertCategories", "editCategories", "deleteCategories"];
    const products = ["addProducts", "removeProducts", "updateProducts"];
    if (categories.findIndex((ob) => response.data === ob) !== -1) {
      const objParams = getCategories();
      restRequest(objParams, true).then(() => {
        window.dispatchEvent(new CustomEvent(customEventCategory));
      });
    } else if (products.findIndex((ob) => response.data === ob) !== -1) {
      window.dispatchEvent(new CustomEvent(customEventProducts));
      // store.dispatch(ADD_PRODUCT);
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.156:3004");
    ws.onopen = openWebSocked;
    ws.onclose = closeWebSocked;
    ws.onmessage = messageWebSocked;
    // console.log(store.getState());
  }, []);


  const setStateModalHook = (open = false, message = "", success = successModal, currDuration) => {
    if (typeof message === "string") {
      setMessageModal(message);
    } else {
      const cod = Object.keys(message)[0];
      setMessageModal(message[cod]);
    }
    setIsOpen(open);
    setSuccessModal(success);
    if (currDuration) {
      setDuration(currDuration);
    } else {
      setDuration(DEFAULT_DURATION);
    }
  };

  const changeSelectDate = (date) => {
    setSelectCurrentDate(getCurrentDate(date));
  };

  return (
    <ModalContext.Provider
      value={{
        // store,
        setParamsIfoModal: setStateModalHook,
        selectDate: selectCurrentDate,
        changeSelectDate,
        isMobile
      }}
    >
      <Fragment>
        {children}
        <ModalInfo
          isOpen={isOpen}
          message={messageModal}
          success={successModal}
          closeModalInfo={() => setIsOpen(false)}
          duration={duration}
        />
      </Fragment>
    </ModalContext.Provider>
  );
};

ModalWrapper.propTypes = {};

ModalWrapper.defaultProps = {};

export default ModalWrapper;
