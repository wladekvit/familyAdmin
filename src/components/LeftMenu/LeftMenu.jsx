import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./LeftMenu.module.scss";
import Icon from "../Icon/Icon";
import { CSSTransition } from "react-transition-group";
import ItemMenu from "./components/ItemMenu";
import { routes } from "../../pages/router";

const LeftMenu = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(history.location.pathname);

  const clickItemLinc = (path) => {
    setCurrentPath(path);
  };

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
        onExited={() => history.push(currentPath)}
      >
        <div className={style.container_menu} onClick={() => setIsOpen(false)}>
          <h2>Меню</h2>
          <ItemMenu
            nameIcon="itemMenu"
            title="Приход-расход"
            path={routes.home}
            clickItemMenu={clickItemLinc}
            currentPath={currentPath}
          />
          <ItemMenu
            nameIcon="itemMenu"
            title="Добавить приход"
            path={routes.addDebit}
            clickItemMenu={clickItemLinc}
            currentPath={currentPath}
          />
          <ItemMenu
            nameIcon="itemMenu"
            title="Добавить расход"
            path={routes.addCredit}
            clickItemMenu={clickItemLinc}
            currentPath={currentPath}
          />
          <ItemMenu
            nameIcon="itemMenu"
            title="Категории"
            path={routes.categories}
            clickItemMenu={clickItemLinc}
            currentPath={currentPath}
          />
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