import React, { Fragment, useState } from "react";
import ModalInfo from "../components/ModalInfo";

export const withInfoContainer = (WrapperComponent, duration) => {
  return (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messageModal, setMessageModal] = useState("");
    const [successModal, setSuccessModal] = useState(true);

    const setStateModalHook = (open = false, message = "", success = successModal) => {
      setIsOpen(open);
      setMessageModal(message);
      setSuccessModal(success);
    };

    return (
      <Fragment>
        <WrapperComponent setParamsIfoModal={setStateModalHook} {...props} />
        <ModalInfo
          isOpen={isOpen}
          message={messageModal}
          success={successModal}
          closeModalInfo={() => setIsOpen(false)}
          duration={duration}
        />
      </Fragment>
    );
  };
};
