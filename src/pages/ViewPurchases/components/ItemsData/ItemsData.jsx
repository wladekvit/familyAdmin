import React, { useState } from "react";
// import PropTypes from "prop-types";
import s from "./ItemsData.module.scss";
import { months } from "../../../../utils/constans";
import Icon from "../../../../components/Icon/Icon";

const ItemsData = ({ date, name, category, quality, unit, price, id }) => {
  const [editMode, setEditMode] = useState(false);

  const deleteHandler = () => {
    console.log("deleteHandler", id);
  };

  const updateHandler = () => {
    setEditMode(!editMode);
  };

  const curDate = new Date(date);
  let day = curDate.getDate().toString();
  if (day.length < 2) day = "0" + day;
  const month = months[curDate.getMonth()].shortName;
  const year = curDate.getFullYear().toString().slice(2, 4);
  return (
    <div className={s.wrapper}>
      <div className={s.topContainer}>
        <div className={s.itemDate}>
          <span>{`${day} ${month} ${year}`}</span>
        </div>
        <div className={s.itemName}>
          <span>{`${name.toString().toUpperCase()} (${category})`}</span>
        </div>
        <div className={s.itemQuality}>
          {editMode && <input type="number" defaultValue={quality} placeholder="кол-во" />}
          {!editMode && <span>{`${quality} (${unit})`}</span>}
        </div>
        <div className={s.itemPrice}>
          {editMode && <input type="number" defaultValue={price} placeholder="цена" />}
          {!editMode && <span>{`${price} грн.`}</span>}
        </div>
        <div className={s.buttonBird} onClick={updateHandler}>
          {!editMode && <Icon name="bird" />}
          {editMode && <Icon name="save" />}
        </div>
        <div className={s.buttonTrash} onClick={deleteHandler}>
          <Icon name="trash" width="14" height="19" />
        </div>
      </div>
    </div>
  );
};

ItemsData.propTypes = {
  // bla: PropTypes.string,
};

ItemsData.defaultProps = {
  // bla: 'test',
};

export default ItemsData;
