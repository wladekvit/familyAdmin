/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import PropTypes from "prop-types";
import s from "./SelectPeriod.module.scss";
import { getCurrentDate } from "../../../../utils/initialisation";

const SelectPeriod = ({ dateFrom, dateTo, setDateFrom, setDateTo }) => {
  const onChangeDateFrom = (e) => {
    const from = new Date(e.target.value);
    const to = new Date(dateTo);
    setDateFrom(getCurrentDate(e.target.value));
    if (from.getTime() >= to.getTime()) {
      to.setDate(from.getDate() + 1);
      to.setMonth(from.getMonth() + 1);
      to.setDate(1);
      to.setDate(to.getDate() - 1);
      setDateTo(getCurrentDate(to));
    }
  };
  const onChangeDateTo = (e) => {
    const from = new Date(dateFrom);
    const to = new Date(e.target.value);
    setDateTo(getCurrentDate(e.target.value));
    if (to.getTime() <= from.getTime()) {
      from.setMonth(to.getMonth());
      from.setDate(to.getDate() - 1);
      from.setDate(1);
      setDateFrom(getCurrentDate(from));
    }
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
