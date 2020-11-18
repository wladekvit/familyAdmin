import React, { useState } from "react";
import PropTypes from "prop-types";
import s from "./CustomKeyBoard.module.scss";
import Modal from "../Modal";

const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

const CustomKeyBoard = ({ isOpen, title, closeOpen, value, callback }) => {
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
  const delValue = () => {
    navigator.vibrate(40);
    const res = [...value];
    const timer = setTimeout(() => {
      callback("");
    }, 1000);
    res.pop();
    callback(res.join(""));
    setTimerItem(timer);
  };
  const sendValue = () => {
    closeOpen(false);
    const flt = parseFloat([...value].join("")) + "";
    callback(flt);
  }
  const clearTimer = () => {
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
          {buttons.map((but, i) => (
            <div key={i} onTouchStart={() => addValue(but)}>
              <span>{but}</span>
            </div>
          ))}
          <div onTouchStart={delValue} onTouchEnd={clearTimer}>
            <span>⇐</span>
          </div>
        </section>
        <section className={s.inputFooter} onTouchStart={sendValue}>
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
  callback: PropTypes.func
};

CustomKeyBoard.defaultProps = {
  title: "ввести"
};

export default CustomKeyBoard;
