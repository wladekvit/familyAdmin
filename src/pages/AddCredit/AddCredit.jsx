/* eslint-disable jsx-a11y/accessible-emoji,react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import style from "./AddCredit.module.scss";
import Button from "../../components/Button";
import getCategories from "../../queries/getCategories";
import { restRequest } from "../../utils/restRequest";
import { onSelectCategoryUtility } from "../../utils/initialisation";
import ModalSelectCategory from "../Products/components/ModalSelectCategory";
import getUnits from "../../queries/getUnits";
import addPurchases from "../../queries/addPurchases";
import { customEventProducts } from "../../utils/constans";
import { useRequestQueries } from "../../hooks/useRequestQueries";
import { useModalContext } from "../../components/ModalWrapper/ModalWrapper";
import CustomKeyBoard from "../../components/CastomKeyBoard";

const objectUnits = getUnits();
const objectCategories = getCategories();
const STATUS = {
  purchases: 1,
  quantity: 2
};

const AddCredit = () => {
  const { selectDate, changeSelectDate, setParamsIfoModal, isMobile } = useModalContext();
  const { data: dataUnits } = useRequestQueries(objectUnits, setParamsIfoModal);
  const { data: dataCategories } = useRequestQueries(objectCategories, setParamsIfoModal);

  const [customKeyboard, setCustomKeyboard] = useState({ visible: false, status: "" });
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [modalProductOpen, setModalProductOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selCategory, setSelCategory] = useState(null);
  const [selProduct, setSelProduct] = useState(null);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [units, setUnits] = useState([]);

  const onSelectCategory = (selectCategory) => {
    onSelectCategoryUtility(selectCategory, setParamsIfoModal)
      .then((products) => {
        // console.log(products);
        setProducts(products);
        setSelCategory(selectCategory);
        setSelProduct(null);
      })
      .catch(() => {});
  };
  const onSelectProduct = (selectProduct) => {
    setSelProduct(selectProduct);
  };
  const onClickButtonUpdate = () => {
    const objParams = addPurchases(
      selectDate,
      +selProduct.id,
      +selCategory.id,
      +price,
      +selProduct.unit,
      +quantity
    );
    // console.log("click");
    restRequest(objParams).then((data) => {
      if (data && data.hasOwnProperty("error")) {
        setParamsIfoModal(true, data.error, false);
      } else {
        const mess = `Успех!!! Покупка ${selProduct.name.toUpperCase()} по цене ${price} грн, в количестве ${quantity} (${getUnitProduct()}) добавлена в базу 😊`;
        setParamsIfoModal(true, mess, true);
        setPrice("");
        setQuantity("");
      }
    });
  };
  const getDisableButton = () => {
    return selProduct && selCategory && quantity !== "" && price !== "";
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
            onClickButtonUpdate();
          }
          break;
        default:
          break;
      }
    },
    [selProduct, selCategory, quantity, price]
  );
  const onChangePrice = (e) => {
    const prs = e.target.value.replace(",", ".");
    setPrice(prs);
  };
  const onChangePriceMobile = (value) => {
    setPrice(value);
  };
  const onChangeQuantity = (e) => {
    const prs = e.target.value.replace(",", ".");
    setQuantity(prs);
  };
  const onChangeQuantityMobile = (value) => {
    setQuantity(value);
  };
  const onChangeDate = (e) => {
    changeSelectDate(e.target.value);
  };
  const closeModalKeyboard = (value) => {
    setCustomKeyboard((prev) => {
      return { ...prev, visible: value };
    });
  };
  const getUnitProduct = () => {
    if (selProduct) {
      const un = units.find((u) => u.id === +selProduct.unit);
      return un.unit;
    }
    return "непонятно что";
  };

  const onListenerChangeProducts = useCallback(() => {
    setModalProductOpen(false);
    setModalSelectOpen(false);
    setSelCategory(null);
    setSelProduct(null);
    setPrice("");
    setQuantity("");
    setParamsIfoModal(true, "Кто-то добавил в базу новый вид продукта", true);
  }, [price, quantity]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);
    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [onKeyDownHandler]);

  useEffect(() => {
    dataUnits.sort((a, b) => (a.unit > b.unit ? 1 : -1));
    setUnits(dataUnits);
  }, [dataUnits]);

  useEffect(() => {
    dataCategories.sort((a, b) => (a.category > b.category ? 1 : -1));
    setCategories(dataCategories);
  }, [dataCategories]);

  useEffect(() => {
    window.addEventListener(customEventProducts, onListenerChangeProducts);
    return () => {
      window.removeEventListener(customEventProducts, onListenerChangeProducts);
    };
  }, []);

  /*useEffect(() => {
    console.log("%cRENDER COMPONENT AddCredit", "color: #00ff00", dataUnits);
  });*/

  if ( dataUnits.length === 0 || dataCategories.length ===0 ) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.container_sections}>
        <div className={style.infoTitle}>
          <span>что купил то внеси 🤠</span>
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
          <span>Выбери то что купил 🧾</span>
          <input
            type="text"
            placeholder="🖋 тут выбери название покупки"
            onClick={() => setModalProductOpen(true)}
            value={selProduct?.name || ""}
            readOnly={true}
          />
          <span>Сколько это стояло 🏧, в ГРН</span>
          <input
            type={isMobile ? "text" : "number"}
            placeholder="🖋 цена покупки 0"
            value={price}
            onClick={
              isMobile
                ? () => setCustomKeyboard({ visible: true, status: STATUS.purchases })
                : () => {}
            }
            onChange={!isMobile ? onChangePrice : () => {}}
            readOnly={isMobile}
          />
          <span>{`Количество в (${getUnitProduct()})`}</span>
          <input
            type={isMobile ? "text" : "number"}
            placeholder={`🖋 сколько купил (${getUnitProduct()})`}
            value={quantity}
            onChange={!isMobile ? onChangeQuantity : () => {}}
            onClick={
              isMobile
                ? () => setCustomKeyboard({ visible: true, status: STATUS.quantity })
                : () => {}
            }
            readOnly={isMobile}
          />
          <span>Когда купил 🏧</span>
          <input type="date" defaultValue={selectDate} onChange={onChangeDate} />
        </div>
        <div className={style.infoFooter}>
          <Button
            title="добавить покупку"
            clickCallBack={onClickButtonUpdate}
            disable={getDisableButton()}
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
        isOpen={modalProductOpen}
        closeOpen={setModalProductOpen}
        categories={products}
        onSelectCategories={onSelectProduct}
      />
      {isMobile && <CustomKeyBoard
        title={customKeyboard.status === STATUS.purchases ? "Какая цена" : "Какое количество"}
        isOpen={customKeyboard.visible}
        closeOpen={closeModalKeyboard}
        value={customKeyboard.status === STATUS.purchases ? price.split("") : quantity.split("")}
        callback={
          customKeyboard.status === STATUS.purchases ? onChangePriceMobile : onChangeQuantityMobile
        }
      />}
    </div>
  );
};

AddCredit.propTypes = {
  // bla: PropTypes.string,
};

AddCredit.defaultProps = {
  // bla: 'test',
};

export default AddCredit;
