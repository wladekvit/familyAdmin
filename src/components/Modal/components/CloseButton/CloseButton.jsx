import React from "react";
import s from "./CloseButton.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(s);

const CloseButton = ({ className, ...props }) => (
  <button aria-label="close modal" className={cx("button", className)} {...props}>
    <span>Close Modal</span>
    <i></i>
  </button>
);

export default CloseButton;
