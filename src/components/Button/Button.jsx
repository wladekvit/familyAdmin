import React from "react";
import PropTypes from "prop-types";
import style from "./Button.module.scss";

const Button = ({ title, className, clickCallBack, disable, ...props }) => {
  return (
    <div
      className={`${disable ? style.wrapper : style.wrapperDisable} ${className}`}
      onClick={disable ? clickCallBack : null}
      {...props}
    >
      <span>{title}</span>
    </div>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  clickCallBack: PropTypes.func,
  disable: PropTypes.bool
};

Button.defaultProps = {
  title: "ok",
  className: "",
  clickCallBack: () => {},
  disable: true
};

export default Button;
