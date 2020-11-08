/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import style from "./Categories.module.scss";
import Button from "../../components/Button";
import getCategories from "../../queries/getCategories";
import removeCategories from "../../queries/removeCategories";
import {restRequest} from "../../utils/restRequest";
import ItemCategories from "./components/ItemCategories";
import ModalAddCategories from "./components/ModalAddCategories";
import ModalRemoveCategory from "./components/ModalRemoveCategory";
import addCategories from "../../queries/addCategories";
import editCategories from "../../queries/editCategory";
import ModalInfo from "../../components/ModalInfo";
import {errorProcessing} from "../../utils/initialisation";
import {customEventCategory} from "../../utils/constans";

const Categories = () => {
  
  const [categories, setCategories] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [openModalAddCat, setOpenModalAddCat] = useState(false);
  const [openModalDelCat, setOpenModalDelCat] = useState(false);
  //info modal
  const [infoModal, setInfoModal] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [successModal, setSuccessModal] = useState(true);
  
  const onClickGetCategories = () => {
    const objParams = getCategories();
    restRequest(objParams).then((data) => {
      if (data && data.hasOwnProperty("error")) {
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        data.sort((a, b) => (a.category > b.category ? 1 : -1));
        setCategories(data);
        console.log(data);
      }
    });
  };
  
  const onClickAddCategories = (name) => {
    const objParams = addCategories(name.toLowerCase());
    restRequest(objParams).then((data) => {
      if (data && data.hasOwnProperty("error")) {
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        setMessageModal(`Успех!!! Категория ${name.toUpperCase()} добавлена в базу 😊`);
        setInfoModal(true);
        setSuccessModal(true);
        // onClickGetCategories();
      }
    });
    setOpenModalAddCat(false);
  };
  
  const delCategories = (name) => {
    const findCat = categories.find((cat) => name === cat.category);
    const objParams = removeCategories(findCat._id);
    restRequest(objParams).then((data) => {
      console.log(data);
      if (data && data.hasOwnProperty("error")) {
        if (openModalDelCat) {
          setOpenModalDelCat(false);
        }
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        setMessageModal(`Успех!!! Название категории удалено из базы 😴`);
        setInfoModal(true);
        setSuccessModal(true);
        if (openModalDelCat) {
          setOpenModalDelCat(false);
        }
        // onClickGetCategories();
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
    const objParams = editCategories(findCat._id, newName.toLowerCase());
    restRequest(objParams).then((data) => {
      console.log(data);
      if (data && data.hasOwnProperty("error")) {
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        setMessageModal(`Успех!!! Название категории изменено в базе`);
        setInfoModal(true);
        setSuccessModal(true);
        // onClickGetCategories();
      }
    });
    
  };
  
  const setCurrentNameCategory = (name) => {
    setCurrentName(name);
    setOpenModalDelCat(true);
  };
  
  const onListenerChangeCategories = () => {
    // console.log("onListenerChangeCategories");
    onClickGetCategories()
  };
  
  useEffect(() => {
    if (categories.length === 0) {
      onClickGetCategories();
    }
    
    window.addEventListener(customEventCategory, onListenerChangeCategories);
    return function () {
      window.removeEventListener(customEventCategory, onListenerChangeCategories);
    }
  }, []);
  
  return (
    <div className={style.wrapper}>
      <h2>Категории</h2>
      <div className={style.container_sections}>
        <div className={style.infoTitle}>
          <span>список категорий</span>
        </div>
        <div className={style.listCategories}>
          {categories.map((category) => (
            <ItemCategories
              key={category._id}
              name={category.category}
              onRemoveCategories={setCurrentNameCategory}
              onEditCategories={editCategory}
            />
          ))}
        </div>
        {/*<Button title="обновить" clickCallBack={onClickGetCategories}/>*/}
        <Button
          title="добавить категорию 👍"
          clickCallBack={() => setOpenModalAddCat(true)}
          className={style.buttonTopMargin}
        />
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
      <ModalInfo
        isOpen={infoModal}
        message={messageModal}
        success={successModal}
        closeModalInfo={setInfoModal}
        duration={5000}
      />
    </div>
  );
};

Categories.propTypes = {
  // bla: PropTypes.string,
};

Categories.defaultProps = {
  // bla: 'test',
};

export default Categories;
