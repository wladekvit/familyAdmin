import React, { useState } from "react";
import PropTypes from "prop-types";
import s from "./CustomKeyBoard.module.scss";
import Modal from "../Modal";

const CustomKeyBoard = ({ isOpen, title, closeOpen, value, callback }) => {
  console.log(title);
  const [timerItem, setTimerItem] = useState(null);
  const addValue = (val) => {

    if (val === "." && value.includes(".")) {
      return;
    }
    let res = [...value, val];
    if (value.includes(".")) {
      const str = res.join("").split(".")[1];
      if (str.length > 2) return;
    }
    if (!res.includes(".")) {
      const flt = parseFloat(res.join("")) + "";
      res = flt.split("");
    }

    navigator.vibrate(40);
    callback(res.join(""));
  };
  const delValue = (e) => {
    navigator.vibrate(40);
    const res = [...value];
    const timer = setTimeout(() => {
      callback("");
    }, 1000);
    res.pop();
    callback(res.join(""));
    setTimerItem(timer);
  };
  const clearTimer =() => {
    clearTimeout(timerItem);
    setTimerItem(null);
  };


  return (
    <Modal isOpen={isOpen} onRequestClose={() => closeOpen(false)} title={title}>
      <div className={s.wrapper}>
        <section className={s.inputWin}>
          <input value={value.join("")} type="text" readOnly={true} disabled={false} />
        </section>
        <section className={s.container}>
          <div onTouchStart={() => addValue(1)}>
            <span>1</span>
          </div>
          <div onTouchStart={() => addValue(2)}>
            <span>2</span>
          </div>
          <div onTouchStart={() => addValue(3)}>
            <span>3</span>
          </div>
          <div onTouchStart={() => addValue(4)}>
            <span>4</span>
          </div>
          <div onTouchStart={() => addValue(5)}>
            <span>5</span>
          </div>
          <div onTouchStart={() => addValue(6)}>
            <span>6</span>
          </div>
          <div onTouchStart={() => addValue(7)}>
            <span>7</span>
          </div>
          <div onTouchStart={() => addValue(8)}>
            <span>8</span>
          </div>
          <div onTouchStart={() => addValue(9)}>
            <span>9</span>
          </div>
          <div onTouchStart={() => addValue(".")}>
            <span>.</span>
          </div>
          <div onTouchStart={() => addValue(0)}>
            <span>0</span>
          </div>
          <div onTouchStart={delValue} onTouchEnd={clearTimer}>
            <span>⇐</span>
          </div>
        </section>
        <section className={s.inputFooter} onTouchStart={() => closeOpen(false)}>
          <span>OK</span>
        </section>
      </div>
    </Modal>
  );
};

CustomKeyBoard.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  closeOpen: PropTypes.func,
  value: PropTypes.array,
  callback: PropTypes.func,
};

CustomKeyBoard.defaultProps = {
  title: "ввести"
};

export default CustomKeyBoard;
