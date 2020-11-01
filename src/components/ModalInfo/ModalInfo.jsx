import React, {useRef} from "react";
import PropTypes from "prop-types";
import s from "./ModalInfo.module.scss";
import Icon from "../Icon/Icon";
import { CSSTransition } from "react-transition-group";

const ModalInfo = ({ isOpen, message, success, closeModalInfo, duration }) => {
  const modalRef = useRef();
  const closeModal = () => {
    setTimeout(() => {
      if (isOpen) {
        closeModalInfo(false);
      }
    }, duration);
  };
  return (
    <CSSTransition
      nodeRef={modalRef}
      in={isOpen}
      timeout={parseInt(s.durationAnimation)}
      classNames="wrapper"
      unmountOnExit
      onEntered={closeModal()}
    >
      <div className={s.wrapper} ref={modalRef}>
        <div className={s.imageInfo}>
          {success && <Icon name="bird" width="85" height="65" />}
          {!success && <Icon name="cross" width="85" height="85" />}
        </div>
        <span>{message}</span>
      </div>
    </CSSTransition>
  );
};

ModalInfo.propTypes = {
  message: PropTypes.string,
  success: PropTypes.bool,
  isOpen: PropTypes.bool,
  duration: PropTypes.number,
};

ModalInfo.defaultProps = {
  message: "success",
  success: true,
  duration: 5000
};

export default ModalInfo;
