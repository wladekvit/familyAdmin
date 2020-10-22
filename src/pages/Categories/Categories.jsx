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

//UPDATE `categories` SET `name` = 'счета' WHERE `categories`.`id` = 22;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [openModalAddCat, setOpenModalAddCat] = useState(false);
  const [openModalDelCat, setOpenModalDelCat] = useState(false);
  
  const onClickGetCategories = async () => {
    const objParams = getCategories();
    restRequest(objParams).then((data) => {
      const categoriesNameArr = data.map((item) => item.name.toLowerCase()).sort();
      setCategories(categoriesNameArr);
      if (openModalDelCat) {
        setOpenModalDelCat(false);
      }
      console.log(data, categoriesNameArr);
    });
  };
  
  const onClickAddCategories = (name) => {
    const objParams = addCategories(name.toLowerCase());
    restRequest(objParams).then((data) => {
      if (data) {
        onClickGetCategories();
      }
    });
    setOpenModalAddCat(false);
  };
  
  const delCategories = (name) => {
    const objParams = removeCategories(name.toLowerCase());
    restRequest(objParams).then((data) => {
      console.log(data);
      if (data) {
        onClickGetCategories();
      }
    });
  };
  
  const setCurrentNameCategory = (name) => {
    setCurrentName(name);
    setOpenModalDelCat(true);
  };
  
  useEffect(() => {
    if (categories.length === 0) {
      onClickGetCategories();
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
          {categories.map((category, index) => (
            <ItemCategories
              key={index}
              name={category}
              onRemoveCategories={setCurrentNameCategory}
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
