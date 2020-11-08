import React, { useState } from "react";
// import PropTypes from "prop-types";
import s from "./ItemsData.module.scss";
import { months } from "../../../../utils/constans";
import Icon from "../../../../components/Icon/Icon";
import Button from "../../../../components/Button";

const ItemsData = ({ date, name, category, quality, unit, price, id, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [currentQuality, setCurrentQuality] = useState(quality);

  const updateHandler = () => {
    setEditMode(true);
    setConfirmDelete(true);
  };
  const confirmationActions = () => {
    if (!editMode) {
      onDelete(id);
    } else {
      onUpdate(+id, +currentPrice, +currentQuality);
    }
    onCancel();
  };
  const onCancel = () => {
    setConfirmDelete(false);
    if (editMode) {
      setEditMode(false);
    }
  };
  const changePriceValue = (e) => {
    setCurrentPrice(e.target.value);
  };
  const changeQualityValue = (e) => {
    setCurrentQuality(e.target.value);
  };

  const curDate = new Date(date);
  let day = curDate.getDate().toString();
  if (day.length < 2) day = "0" + day;
  const month = months[curDate.getMonth()].shortName;
  const year = curDate.getFullYear().toString().slice(2, 4);
  const messButton = editMode ? "сохранить изменения" : "подтверди удаление покупки";

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
          {editMode && (
            <input
              type="number"
              defaultValue={quality}
              placeholder="кол-во"
              onChange={changeQualityValue}
            />
          )}
          {!editMode && <span>{`${quality} (${unit})`}</span>}
        </div>
        <div className={s.itemPrice}>
          {editMode && (
            <input
              type="number"
              defaultValue={price}
              placeholder="цена"
              onChange={changePriceValue}
            />
          )}
          {!editMode && <span>{`${price} грн.`}</span>}
        </div>
        <div className={s.buttonBird} onClick={updateHandler}>
          {!editMode && <Icon name="bird" />}
          {editMode && <Icon name="save" />}
        </div>
        <div className={s.buttonTrash} onClick={() => setConfirmDelete(true)}>
          <Icon
            name="trash"
            width={confirmDelete && !editMode ? "18" : "14"}
            height={confirmDelete && !editMode ? "23" : "19"}
            fill={confirmDelete && !editMode ? "var(--accent)" : "var(--color-text)"}
          />
        </div>
        {confirmDelete && (
          <div className={s.itemButtonOk}>
            <Button
              title={messButton}
              clickCallBack={confirmationActions}
              className={s.customButton}
              style={{ backgroundColor: "#3d9245" }}
            />
          </div>
        )}
        {confirmDelete && (
          <div className={s.itemButtonCancel}>
            <Button
              title="отмена"
              clickCallBack={onCancel}
              className={s.customButton}
              style={{ backgroundColor: "#cf5b47" }}
            />
          </div>
        )}
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
