import React, { Fragment, useEffect, useState } from "react";
import style from "./LeftMenu.module.scss";
import Icon from "../Icon/Icon";
import { CSSTransition } from "react-transition-group";

const LeftMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div className={style.container_hamburger} onClick={() => setIsOpen(true)}>
        <Icon name="menuHamburger" />
      </div>
      <CSSTransition
        in={isOpen}
        timeout={parseInt(style.menuCloseDuration)}
        classNames="container_menu"
        unmountOnExit
      >
        <div className={style.container_menu} onClick={() => setIsOpen(false)}>
          <h2>Меню</h2>
        </div>
      </CSSTransition>
      <CSSTransition
        in={isOpen}
        timeout={parseInt(style.menuCloseDuration)}
        classNames="curtain"
        unmountOnExit
      >
        <div className={style.curtain} onClick={() => setIsOpen(false)} />
      </CSSTransition>
    </Fragment>
  );
};

LeftMenu.propTypes = {
  // bla: PropTypes.string,
};

LeftMenu.defaultProps = {
  // bla: 'test',
};

export default LeftMenu;
