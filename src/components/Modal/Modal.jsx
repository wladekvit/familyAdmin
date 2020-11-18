import React, { Fragment, cloneElement, useState, useEffect } from "react";
import ReactModal from "react-modal";
import s from "./Modal.module.scss";
import cn from "classnames/bind";
import CloseButton from "./components/CloseButton";

const cx = cn.bind(s);

const Modal = ({
  children,
  className,
  classNameContent,
  classNameTitle,
  title,
  showCloseButton = true,
  ...props
}) => {
  const [titleText, setTitleText] = useState(title);

  useEffect(() => {
    setTitleText(title);
  }, [title]);

  return (
    <ReactModal
      className={cx("contentWrapper", className)}
      overlayClassName={cx("overlay", props.overlayClassName)}
      bodyOpenClassName={cx("body", props.bodyOpenClassName)}
      closeTimeoutMS={500}
      shouldCloseOnEsc
      ariaHideApp={false}
      {...props}
    >
      <div className={cx("contentInner", classNameContent)}>
        <Fragment>
          {titleText && <header className={cx("title", classNameTitle)}>{titleText}</header>}

          {cloneElement(children)}
        </Fragment>

        {showCloseButton && <CloseButton onClick={props.onRequestClose} className={s.close} />}
      </div>
    </ReactModal>
  );
};

export default Modal;
