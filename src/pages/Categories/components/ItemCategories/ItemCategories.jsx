import React from "react";
import PropTypes from "prop-types";
import style from "./ItemCategories.module.scss";
import Icon from "../../../../components/Icon/Icon";

const ItemCategories = ({ name, onRemoveCategories }) => {
  
  const removeCategories = () => {
    // console.log("removeCategories", name);
    onRemoveCategories(name);
  }
  return (
    <div className={style.wrapper}>
      <div className={style.leftTag} />
      <span>{name}</span>
      <div className={style.deleteItem} onClick={removeCategories}>
        <Icon name="trash" />
      </div>
      <div className={style.editItem}>
        <Icon name="pencil" />
      </div>
    </div>
  );
};

ItemCategories.propTypes = {
  name: PropTypes.string,
  onRemoveCategories: PropTypes.func
};

ItemCategories.defaultProps = {
  name: "Категория"
};

export default ItemCategories;
