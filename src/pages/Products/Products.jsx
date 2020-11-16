/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useCallback, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
import style from "./Products.module.scss";
import Button from "../../components/Button";
import ModalSelectCategory from "./components/ModalSelectCategory";
import getCategories from "../../queries/getCategories";
import { restRequest } from "../../utils/restRequest";
import getUnits from "../../queries/getUnits";
import addProducts from "../../queries/addProducts";
import getProducts from "../../queries/getProducts";
import Icon from "../../components/Icon/Icon";
import ItemEditProduct from "../../components/ItemEditProduct";
import ModalContext from "../../components/ModalContext";
import { useRequestQueries } from "../../hooks/useRequestQueries";

const MODE = {
  add: 1,
  edit: 2
};

const objectUnits = getUnits();
const objectCategories = getCategories();

const Products = () => {
  const { setParamsIfoModal } = useContext(ModalContext);
  const { data: dataUnits } = useRequestQueries(objectUnits, setParamsIfoModal);
  const { data: dataCategories } = useRequestQueries(objectCategories, setParamsIfoModal);

  const [modeCheck, setModeCheck] = useState(MODE.add);
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [modalUnitsOpen, setModalUnitsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selCategory, setSelCategory] = useState(null);
  const [selUnits, setSelUnits] = useState(null);
  const [units, setUnits] = useState([]);
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const [productsObj, setProductsObj] = useState([]);

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

  const onKeyDownHandler = useCallback(
    (e) => {
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

  const onClickButtonAdd = () => {
    const objParams = addProducts(productName, selCategory.id, selUnits.id);
    setProductName("");
    restRequest(objParams).then((data) => {
      if (data && data.hasOwnProperty("error")) {
        setParamsIfoModal(true, data.error, false);
      } else {
        setParamsIfoModal(true, `Успех!!! ${productName.toUpperCase()} добавлено в базу`, true);
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
        setParamsIfoModal(true, data.error, false);
      } else {
        const prods = data.map((item) => item.name.toLowerCase()).sort();
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
  const updateProducts = async (messageInfo) => {
    const objParams = getProducts(selCategory.id);
    const data = await restRequest(objParams, true);
    try {
      if (data && data.hasOwnProperty("error")) {
        setParamsIfoModal(true, data.error, false);
      } else {
        const prods = data.map((item) => item.name.toLowerCase()).sort();
        setProducts(prods);
        setProductsObj(data);
        if (messageInfo) {
          setParamsIfoModal(true, messageInfo, true);
        }
      }
    } catch (err) {
      setParamsIfoModal(true, "Что-то пошло не так. Сервер не отвечает", false);
      console.log("error", err);
    }
  };
  const onChangeStatus = (value) => {
    setModeCheck(value);
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);
    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [onKeyDownHandler]);
  useEffect(() => {
    dataUnits.sort((a, b) => a.unit > b.unit ? 1 : -1);
    setUnits(dataUnits);
  }, [dataUnits]);
  useEffect(() => {
    dataCategories.sort((a, b) => a.category > b.category ? 1 : -1);
    setCategories(dataCategories);
  }, [dataCategories]);

  const styleSection =
    modeCheck === MODE.add ? style.container_sections : style.container_sections_edit;
  return (
    <div className={style.wrapper}>
      <div className={styleSection}>
        <div className={style.infoTitle}>
          <div className={style.itemInfo} onClick={() => onChangeStatus(MODE.add)}>
            <span>добавлять</span>
            <Icon name="radioButton" check={modeCheck === MODE.add} />
          </div>
          <div className={style.itemInfo} onClick={() => onChangeStatus(MODE.edit)}>
            <span>редактировать</span>
            <Icon name="radioButton" check={modeCheck === MODE.edit} />
          </div>
        </div>
        <div className={style.infoCredit}>
          <div className={style.itemInput}>
            <span>Вбери категорию 👁️</span>
            <input
              type="text"
              placeholder="🖋 тут выбери категорию"
              onClick={() => setModalSelectOpen(true)}
              value={selCategory?.category || ""}
              readOnly={true}
              style={{ cursor: "pointer" }}
            />
          </div>
          {modeCheck === MODE.add && (
            <div className={style.itemInput}>
              <span>Вбери единицу измерения ⚖</span>
              <input
                type="text"
                placeholder="🖋 тут выбери ед. измерения"
                onClick={() => setModalUnitsOpen(true)}
                value={selUnits?.unit || ""}
                readOnly={true}
                style={{ cursor: "pointer" }}
              />
            </div>
          )}
          {modeCheck === MODE.add && (
            <div className={style.itemInput}>
              <span>Название продукта 🍎 🥼 🔨</span>
              <input
                type="text"
                placeholder="🖋 пиши тут название"
                onChange={onChangeInput}
                value={productName}
              />
              <div className={style.findContainer}>{findProducts()}</div>
            </div>
          )}
          {modeCheck === MODE.edit && setProductsObj.length > 0 && (
            <div className={style.contentProducts}>
              {productsObj.map((prod) => (
                <ItemEditProduct
                  key={prod.id}
                  product={prod}
                  units={units}
                  updatingProducts={updateProducts}
                />
              ))}
            </div>
          )}
        </div>
        {modeCheck === MODE.add && (
          <div className={style.infoFooter}>
            <Button
              title="добавить"
              clickCallBack={onClickButtonAdd}
              disable={getDisableButton()}
            />
          </div>
        )}
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
    </div>
  );
};

Products.propTypes = {};
Products.defaultProps = {};

export default Products;
