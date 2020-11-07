/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./SelectDate.module.scss";
import { getCurrentDate } from "../../../../utils/initialisation";

const SelectDate = ({ onSelectDate }) => {
  const [selDate, setSelDate] = useState("");

  const onChangeDate = (e) => {
    const date = getCurrentDate(e.target.value)
    setSelDate(date);
    onSelectDate(date)
  };

  useEffect(() => {
    setSelDate(getCurrentDate());
  }, []);

  return (
    <div className={style.wrapper}>
      <span>Выбери дату для просмотра 🎫</span>
      <input type="date" defaultValue={selDate} onChange={onChangeDate} />
    </div>
  );
};

SelectDate.propTypes = {
  // bla: PropTypes.string,
};

SelectDate.defaultProps = {
  // bla: 'test',
};

export default SelectDate;


