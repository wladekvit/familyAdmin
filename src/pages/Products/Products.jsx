/* eslint-disable jsx-a11y/accessible-emoji */
import React, {useCallback, useEffect, useState} from "react";
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

const Products = () => {
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [modalUnitsOpen, setModalUnitsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selCategory, setSelCategory] = useState(null);
  const [selUnits, setSelUnits] = useState(null);
  const [units, setUnits] = useState([]);
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  //info modal
  const [infoModal, setInfoModal] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [successModal, setSuccessModal] = useState(true);

  const onChangeInput = (e) => {
    setProductName(e.target.value.toLowerCase());
  };
  const getDisableButton = () => {
    return productName !== "" && selCategory && selCategory?.category !== "" && selUnits && selUnits?.unit !== "";
  };
  const onKeyDownHandler = useCallback ((e) => {
    // console.log(e.which);
    // alert(e.which);
    const { which } = e;
    switch (which) {
      case 13:
        document.activeElement.blur()
        if (getDisableButton()) {
          onClickButtonAdd();
        }
        break;
      default:
        break;
    }
  }, [productName, selCategory, selUnits])
  const onClickButtonAdd = () => {
    const objParams = addProducts(productName, selCategory.id, selUnits.id);
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
    const objParams = getProducts(selectionCategory.id);
    restRequest(objParams).then((data) => {
      if (data && data.hasOwnProperty("error")) {
        errorProcessing(data.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        const prods = data.map((item) => item.name.toLowerCase()).sort();
        console.log(prods);
        setProducts(prods);
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
      <h2>ДОБАВЛЕНИЕ</h2>
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
          />
          <span>Вбери единицу измерения ⚖</span>
          <input
            type="text"
            placeholder="🖋 тут выбери ед. измерения"
            onClick={() => setModalUnitsOpen(true)}
            value={selUnits?.unit || ""}
            readOnly={true}
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

        <Button title="добавить" clickCallBack={onClickButtonAdd} disable={getDisableButton()} />
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
