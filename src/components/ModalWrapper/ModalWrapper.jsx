import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import ModalInfo from "../ModalInfo";
import ModalContext from "../ModalContext";
import { getCurrentDate } from "../../utils/initialisation";

const ModalWrapper = ({ children, duration }) => {
  const [selectCurrentDate, setSelectCurrentDate] = useState(getCurrentDate());
  const [isOpen, setIsOpen] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [successModal, setSuccessModal] = useState(true);

  const setStateModalHook = (open = false, message = "", success = successModal) => {

    if (typeof message === "string") {
      setMessageModal(message);
    } else {
      const cod = Object.keys(message)[0];
      setMessageModal(message[cod]);
    }
    setIsOpen(open);
    setSuccessModal(success);
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

ModalWrapper.propTypes = {
  // bla: PropTypes.string,
};

ModalWrapper.defaultProps = {
  // bla: 'test',
};

export default ModalWrapper;
