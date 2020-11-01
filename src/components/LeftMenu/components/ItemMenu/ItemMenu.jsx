import React from "react";
import PropTypes from "prop-types";
import style from "./ItemMenu.module.scss";
import Icon from "../../../Icon/Icon";

const ItemMenu = ({ nameIcon, title, path, currentPath, clickItemMenu }) => {
  const clickItem = () => {
    clickItemMenu(path);
  };
  const colorItem = currentPath === path ? "#a972e8" : "#ffffff"
  return (
    <div className={style.wrapper} onClick={clickItem}>
      <Icon name={nameIcon} fill={currentPath === path ? "#f14747" : undefined } />
      <span style={{color: colorItem}}>{title}</span>
    </div>
  );
};

ItemMenu.propTypes = {
  nameIcon: PropTypes.string,
  title: PropTypes.string,
  path: PropTypes.string,
  currentPath: PropTypes.string,
  clickItemMenu: PropTypes.func
};

ItemMenu.defaultProps = {
  nameIcon: "itemMenu",
  title: "Пункт меню",
  currentPath: "",
  path: "/",
  clickItemMenu: () => {}
};

export default ItemMenu;
