import React from "react";
import style from "./AddCredit.module.scss";

const AddCredit = () => {
  return (
    <div className={style.wrapper}>
      <h2>Расход средств</h2>
    </div>
  );
};

AddCredit.propTypes = {
  // bla: PropTypes.string,
};

AddCredit.defaultProps = {
  // bla: 'test',
};

export default AddCredit;
