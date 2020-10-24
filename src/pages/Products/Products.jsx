import React, { createRef, useEffect, useState } from "react";
import style from "./Products.module.scss";
import Button from "../../components/Button";
import ModalSelectCategory from "./components";
import getCategories from "../../queries/getCategories";
import { restRequest } from "../../utils/restRequest";
import getUnits from "../../queries/getUnits";
import addProducts from "../../queries/addProducts";

const Products = () => {
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [modalUnitsOpen, setModalUnitsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selCategory, setSelCategory] = useState("");
  const [selUnits, setSelUnits] = useState("");
  const [units, setUnits] = useState([]);
  const [productName, setProductName] = useState("");
  const inputNameProduct = createRef();

  const onChangeInput = (e) => {
    setProductName(e.target.value.toLowerCase());
  };

  const onClickButtonAdd = () => {
    const objParams = addProducts(productName, selCategory, selUnits);
    setProductName("");
    restRequest(objParams).then((data) => {
      if (data) {
        console.log(data);
      }
    });
    // inputNameProduct.current.value = "";
  };
  const onSelectCategory = (name) => {
    setSelCategory(name);
  };
  const onSelectUnits = (name) => {
    setSelUnits(name);
  };

  useEffect(() => {
    let objParams = getUnits();
    restRequest(objParams).then((data) => {
      if (data) {
        const unitsData = data.map((item) => item.name);
        setUnits(unitsData);
      }
    });
    objParams = getCategories();
    restRequest(objParams).then((data) => {
      if (data) {
        const categoriesNameArr = data.map((item) => item.name.toLowerCase()).sort();
        setCategories(categoriesNameArr);
      }
    });
  }, []);

  const disableAddButton = productName !== "" && selCategory !== "" && selUnits !== "";
  
  return (
    <div className={style.wrapper}>
      <h2>добавление</h2>
      <div className={style.container_sections}>
        <div className={style.infoTitle}>
          <span>добавить название продукта, товара, услуги</span>
        </div>
        <div className={style.infoCredit}>
          <span>Вбери категорию 👁️</span>
          <input
            type="text"
            placeholder="🖋 тут выбери категорию"
            onClick={() => setModalSelectOpen(true)}
            value={selCategory || ""}
            readOnly={true}
          />

          <span>Вбери единицу измерения ⚖</span>
          <input
            type="text"
            placeholder="🖋 тут выбери ед. измерения"
            onClick={() => setModalUnitsOpen(true)}
            value={selUnits || ""}
            readOnly={true}
          />

          <span>Название продукта 🍎 🥼 🔨</span>
          <input
            type="text"
            placeholder="🖋 пиши тут название"
            onChange={onChangeInput}
            ref={inputNameProduct}
            value={productName}
          />
        </div>
        <Button title="добавить" clickCallBack={onClickButtonAdd} disable={disableAddButton} />
        <ModalSelectCategory
          isOpen={modalSelectOpen}
          closeOpen={setModalSelectOpen}
          categories={categories}
          onSelectCategories={onSelectCategory}
        />
        <ModalSelectCategory
          isOpen={modalUnitsOpen}
          closeOpen={setModalUnitsOpen}
          categories={units}
          onSelectCategories={onSelectUnits}
        />
      </div>
    </div>
  );
};

Products.propTypes = {
  // bla: PropTypes.string,
};

Products.defaultProps = {
  // bla: 'test',
};

export default Products;
