/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import PropTypes from "prop-types";
import s from "./SelectPeriod.module.scss";
import { getCurrentDate } from "../../../../utils/initialisation";

const SelectPeriod = ({ dateFrom, dateTo, setDateFrom, setDateTo }) => {

  const onChangeDateFrom = (e) => {
    setDateFrom(getCurrentDate(e.target.value));
  };
  const onChangeDateTo = (e) => {
    setDateTo(getCurrentDate(e.target.value));
  };

  return (
    <div className={s.wrapper}>
      <span>Выбери дату ОТ 🎫</span>
      <input type="date" value={dateFrom} onChange={onChangeDateFrom} />
      <span>Выбери дату ДО 🎫</span>
      <input type="date" value={dateTo} onChange={onChangeDateTo} />
    </div>
  );
};

SelectPeriod.propTypes = {
  dateFromDefault: PropTypes.string,
  dateToDefault: PropTypes.string,
  setDateFrom: PropTypes.func,
  setDateTo: PropTypes.func
};

SelectPeriod.defaultProps = {
  dateFromDefault: getCurrentDate(),
  dateToDefault: getCurrentDate()
};

export default SelectPeriod;
