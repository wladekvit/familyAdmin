import React from "react";
import style from "./AddDebit.module.scss"

const AddDebit = () => {
  return (
    <div className={style.wrapper}>
      <h2>Приход средств</h2>
    </div>
  );
};

AddDebit.propTypes = {
  // bla: PropTypes.string,
};

AddDebit.defaultProps = {
  // bla: 'test',
};

export default AddDebit;