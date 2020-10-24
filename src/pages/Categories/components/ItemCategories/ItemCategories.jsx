import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./ItemCategories.module.scss";
import Icon from "../../../../components/Icon/Icon";
import { CSSTransition } from "react-transition-group";

const ItemCategories = ({ name, onRemoveCategories, onEditCategories }) => {
  const [editCategory, setEditCategory] = useState(false);
  const [newName, setNewName] = useState("");

  const removeCategories = () => {
    // console.log("removeCategories", name);
    onRemoveCategories(name);
  };

  const toggleMode = () => {
    setEditCategory(true);
  };

  const saveEditCategory = () => {
    setEditCategory(false);
    onEditCategories(name, newName);
    
  };

  const onChangeInputValue = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.leftTag} />
      <span>{name}</span>
      <div className={style.deleteItem} onClick={removeCategories}>
        <Icon name="trash" />
      </div>
      <div className={style.editItem} onClick={editCategory ? saveEditCategory : toggleMode}>
        <Icon name={editCategory ? "bird" : "pencil"} />
      </div>
      <CSSTransition in={editCategory} timeout={500} classNames="inputEdit" unmountOnExit>
        <input
          className={style.inputEdit}
          type="text"
          defaultValue={name}
          onChange={onChangeInputValue}
        />
      </CSSTransition>
    </div>
  );
};

ItemCategories.propTypes = {
  name: PropTypes.string,
  onRemoveCategories: PropTypes.func,
  onEditCategories: PropTypes.func
};

ItemCategories.defaultProps = {
  name: "Категория"
};

export default ItemCategories;
