/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
import style from "./Categories.module.scss";
import Button from "../../components/Button";
import getCategories from "../../queries/getCategories";
import removeCategories from "../../queries/removeCategories";
import { restRequest } from "../../utils/restRequest";
import ItemCategories from "./components/ItemCategories";
import ModalAddCategories from "./components/ModalAddCategories";
import ModalRemoveCategory from "./components/ModalRemoveCategory";
import addCategories from "../../queries/addCategories";
import editCategories from "../../queries/editCategory";
import { customEventCategory } from "../../utils/constans";
import ModalContext from "../../components/ModalContext";

const Categories = () => {
  const { setParamsIfoModal } = useContext(ModalContext);
  const [categories, setCategories] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [openModalAddCat, setOpenModalAddCat] = useState(false);
  const [openModalDelCat, setOpenModalDelCat] = useState(false);

  const onClickGetCategories = () => {
    const objParams = getCategories();
    restRequest(objParams).then((data) => {
      if (data && data.hasOwnProperty("error")) {
        setParamsIfoModal(true, data.error, false);
      } else {
        data.sort((a, b) => (a.category > b.category ? 1 : -1));
        setCategories(data);
        // console.log(data);
      }
    });
  };

  const onClickAddCategories = (name) => {
    const objParams = addCategories(name.toLowerCase());
    restRequest(objParams).then((data) => {
      if (data && data.hasOwnProperty("error")) {
        setParamsIfoModal(true, data.error, false);
      } else {
        setParamsIfoModal(
          true,
          `Успех!!! Категория ${name.toUpperCase()} добавлена в базу 😊`,
          true
        );
      }
    });
    setOpenModalAddCat(false);
  };

  const delCategories = (name) => {
    const findCat = categories.find((cat) => name === cat.category);
    const objParams = removeCategories(findCat.id);
    restRequest(objParams).then((data) => {
      console.log(data);
      if (data && data.hasOwnProperty("error")) {
        if (openModalDelCat) {
          setOpenModalDelCat(false);
        }
        setParamsIfoModal(true, data.error, false);
      } else {
        setParamsIfoModal(true, "Успех!!! Название категории удалено из базы 😴", true);
        if (openModalDelCat) {
          setOpenModalDelCat(false);
        }
      }
    });
  };

  const editCategory = (oldName, newName) => {
    const oN = oldName.trim().toLowerCase();
    const nN = newName.trim().toLowerCase();
    const findCat = categories.find((cat) => oldName === cat.category);

    if (nN === "" || nN === oN) {
      return;
    }
    const objParams = editCategories(findCat.id, newName.toLowerCase());
    restRequest(objParams).then((data) => {
      // console.log(data);
      if (data && data.hasOwnProperty("error")) {
        setParamsIfoModal(true, data.error, false);
      } else {
        setParamsIfoModal(true, "Успех!!! Название категории изменено в базе", true, 3000);
      }
    });
  };

  const setCurrentNameCategory = (name) => {
    setCurrentName(name);
    setOpenModalDelCat(true);
  };

  const onListenerChangeCategories = () => {
    // console.log("onListenerChangeCategories");
    onClickGetCategories();
  };

  useEffect(() => {
    if (categories.length === 0) {
      onClickGetCategories();
    }

    window.addEventListener(customEventCategory, onListenerChangeCategories);
    return function () {
      window.removeEventListener(customEventCategory, onListenerChangeCategories);
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container_sections}>
        <div className={style.infoTitle}>
          <span>список категорий</span>
        </div>
        <div className={style.listCategories}>
          {categories.map((category) => (
            <ItemCategories
              key={category.id}
              name={category.category}
              onRemoveCategories={setCurrentNameCategory}
              onEditCategories={editCategory}
            />
          ))}
        </div>
        <div className={style.buttonContainer}>
          <Button title="добавить категорию 👍" clickCallBack={() => setOpenModalAddCat(true)} />
        </div>
      </div>
      <ModalAddCategories
        isOpen={openModalAddCat}
        closeOpen={setOpenModalAddCat}
        onClickAddCategories={onClickAddCategories}
      />
      <ModalRemoveCategory
        isOpen={openModalDelCat}
        closeOpen={setOpenModalDelCat}
        name={currentName}
        onClickRemoveCategories={delCategories}
      />
    </div>
  );
};

Categories.propTypes = {};
Categories.defaultProps = {};

export default Categories;
