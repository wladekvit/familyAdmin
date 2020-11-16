import React, { Fragment, useState } from "react";
// import PropTypes from "prop-types";
import ModalInfo from "../ModalInfo";
import ModalContext from "../ModalContext";
import { getCurrentDate } from "../../utils/initialisation";

const DEFAULT_DURATION = 5000;

const ModalWrapper = ({ children }) => {
  const [selectCurrentDate, setSelectCurrentDate] = useState(getCurrentDate());
  const [isOpen, setIsOpen] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [successModal, setSuccessModal] = useState(true);
  const [duration, setDuration] = useState(DEFAULT_DURATION);

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
        setParamsIfoModal: setStateModalHook,
        selectDate: selectCurrentDate,
        changeSelectDate
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
