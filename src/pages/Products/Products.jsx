/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useCallback, useEffect, useState } from "react";
import style from "./Products.module.scss";
import Button from "../../components/Button";
import ModalSelectCategory from "./components/ModalSelectCategory";
import getCategories from "../../queries/getCategories";
import { restRequest } from "../../utils/restRequest";
import getUnits from "../../queries/getUnits";
import addProducts from "../../queries/addProducts";
import ModalInfo from "../../components/ModalInfo";
import { errorProcessing } from "../../utils/initialisation";
import getProducts from "../../queries/getProducts";
import ModalItemsEdit from "../../components/ModalItemsEdit/ModalItemsEdit";

const Products = () => {
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [modalUnitsOpen, setModalUnitsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selCategory, setSelCategory] = useState(null);
  const [selUnits, setSelUnits] = useState(null);
  const [units, setUnits] = useState([]);
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const [productsObj, setProductsObj] = useState([]);
  //info modal
  const [infoModal, setInfoModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [successModal, setSuccessModal] = useState(true);

  const onChangeInput = (e) => {
    setProductName(e.target.value.toLowerCase());
  };
  const getDisableButton = () => {
    return (
      productName !== "" &&
      selCategory &&
      selCategory?.category !== "" &&
      selUnits &&
      selUnits?.unit !== ""
    );
  };
  const getDisableEditButton = () => {
    return selCategory && selCategory?.category !== "";
  };
  const onKeyDownHandler = useCallback(
    (e) => {
      // console.log(e.which);
      // alert(e.which);
      const { which } = e;
      switch (which) {
        case 13:
          document.activeElement.blur();
          if (getDisableButton()) {
            onClickButtonAdd();
          }
          break;
        default:
          break;
      }
    },
    [productName, selCategory, selUnits]
  );
  const onClickButtonEdit = () => {
    setEditModal(true);
  };
  const onClickButtonAdd = () => {
    const objParams = addProducts(productName, selCategory._id, selUnits._id);
    setProductName("");
    restRequest(objParams).then((data) => {
      if (data && data.hasOwnProperty("error")) {
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        setMessageModal(`Успех!!! ${productName.toUpperCase()} добавлено в базу`);
        setInfoModal(true);
        setSuccessModal(true);
        if (selCategory) {
          onSelectCategory(selCategory);
        }
      }
    });
  };
  const onSelectCategory = (selectionCategory) => {
    setSelCategory(selectionCategory);
    const objParams = getProducts(selectionCategory._id);
    restRequest(objParams).then((data) => {
      if (data && data.hasOwnProperty("error")) {
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        const prods = data.map((item) => item.name.toLowerCase()).sort();
        // console.log(prods);
        setProducts(prods);
        setProductsObj(data);
      }
    });
  };
  const onSelectUnits = (selectUnit) => {
    setSelUnits(selectUnit);
  };
  const findProducts = () => {
    if (productName !== "") {
      return products
        .filter((prod) => prod.startsWith(productName))
        .map((pr, i) => <span key={i}>{pr}</span>);
    }
  };
  const updateProducts = async () => {
    const objParams = getProducts(selCategory._id);
    const data = await restRequest(objParams, true);
    try {
      if (data && data.hasOwnProperty("error")) {
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        const prods = data.map((item) => item.name.toLowerCase()).sort();
        setProducts(prods);
        setProductsObj(data);
      }
    } catch (err) {
      setMessageModal(`Что-то пошло не так. Сервер не отвечает`);
      setInfoModal(true);
      setSuccessModal(false);
      console.log("error", err);
    }

  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);
    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [onKeyDownHandler]);
  useEffect(() => {
    let objParams = getUnits();
    restRequest(objParams)
      .then((data) => {
        if (data && data.hasOwnProperty("error")) {
          errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
        } else {
          setUnits(data);
          objParams = getCategories();
          restRequest(objParams).then((data) => {
            if (data && data.hasOwnProperty("error")) {
              errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
            } else {
              data.sort((a, b) => (a.category > b.category ? 1 : -1));
              setCategories(data);
            }
          });
        }
      })
      .catch((err) => {
        setMessageModal(`Что-то пошло не так. Сервер не отвечает`);
        setInfoModal(true);
        setSuccessModal(false);
        console.log("error", err);
      });
  }, []);

  return (
    <div className={style.wrapper}>
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
            value={selCategory?.category || ""}
            readOnly={true}
            style={{ cursor: "pointer" }}
          />
          <span>Вбери единицу измерения ⚖</span>
          <input
            type="text"
            placeholder="🖋 тут выбери ед. измерения"
            onClick={() => setModalUnitsOpen(true)}
            value={selUnits?.unit || ""}
            readOnly={true}
            style={{ cursor: "pointer" }}
          />
          <span>Название продукта 🍎 🥼 🔨</span>
          <input
            type="text"
            placeholder="🖋 пиши тут название"
            onChange={onChangeInput}
            value={productName}
          />
          <div className={style.findContainer}>{findProducts()}</div>
        </div>
        <div className={style.infoFooter}>
          <Button
            title="добавить"
            clickCallBack={onClickButtonAdd}
            disable={getDisableButton()}
            style={{ width: "48%" }}
          />
          <Button
            title="изменить"
            clickCallBack={onClickButtonEdit}
            disable={getDisableEditButton()}
            style={{ width: "48%" }}
          />
        </div>
      </div>
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
      <ModalInfo
        isOpen={infoModal}
        message={messageModal}
        success={successModal}
        closeModalInfo={setInfoModal}
        duration={3000}
      />
      <ModalItemsEdit
        isOpen={editModal}
        closeOpen={setEditModal}
        products={productsObj}
        units={units}
        update={updateProducts}
      />
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
