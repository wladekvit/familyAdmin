/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import s from "./SelectName.module.scss";
import ModalSelectCategory from "../../../Products/components/ModalSelectCategory";
import { restRequest } from "../../../../utils/restRequest";
import { errorProcessing } from "../../../../utils/initialisation";
import getCategories from "../../../../queries/getCategories";
import getProducts from "../../../../queries/getProducts";

const SelectName = ({ productDefault, setProductDefault }) => {
  //info modal
  const [, setInfoModal] = useState(false);
  const [, setMessageModal] = useState("");
  const [, setSuccessModal] = useState(true);

  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [modalProductOpen, setModalProductOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const gettingCategories = async () => {
    try {
      const objParams = getCategories();
      const data = await restRequest(objParams);
      if (data && data.hasOwnProperty("error")) {
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        data.sort((a, b) => (a.category > b.category ? 1 : -1));
        setCategories(data);
      }
    } catch (e) {
      errorProcessing("Что-то пошло не так", setMessageModal, setInfoModal, setSuccessModal);
    }
  };

  const onChangeProduct = (selectedProduct) => {
    setProductDefault(selectedProduct);
  };

  const onChangeCategory = async (selectCategory) => {
    try {
      const objParams = getProducts(selectCategory.id);
      const data = await restRequest(objParams);
      if (data && data.hasOwnProperty("error")) {
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        data.sort((a, b) => (a.name > b.name ? 1 : -1));
        setCategory(selectCategory.category);
        setProducts(data);
      }
    } catch (e) {
      errorProcessing("Что-то пошло не так", setMessageModal, setInfoModal, setSuccessModal);
    }
    // console.log(selectCategory);
  };

  useEffect(() => {
    gettingCategories().then();
  }, []);

  return (
    <div className={s.wrapper}>
      <span>Вбери категорию 👁️</span>
      <input
        type="text"
        placeholder="🖋 тут выбери категорию"
        onClick={() => setModalSelectOpen(true)}
        value={category}
        readOnly={true}
      />
      <span>Название продукта 🍎 🥼 🔨</span>
      <input
        type="text"
        placeholder="🖋 тут выбери название"
        onClick={() => setModalProductOpen(true)}
        defaultValue={productDefault.name}
        readOnly={true}
      />
      <ModalSelectCategory
        isOpen={modalSelectOpen}
        closeOpen={setModalSelectOpen}
        categories={categories}
        onSelectCategories={onChangeCategory}
      />
      <ModalSelectCategory
        isOpen={modalProductOpen}
        closeOpen={setModalProductOpen}
        categories={products}
        onSelectCategories={onChangeProduct}
      />
    </div>
  );
};

SelectName.propTypes = {
  productDefault: PropTypes.object,
  setProductDefault: PropTypes.func
};

SelectName.defaultProps = {};

export default SelectName;
