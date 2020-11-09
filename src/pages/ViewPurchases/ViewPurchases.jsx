import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import style from "./ViewPurchases.module.scss";
import Button from "../../components/Button";
import ModalInfo from "../../components/ModalInfo";
import Icon from "../../components/Icon/Icon";
import SelectDate from "./components/SelectDate";
import ItemsData from "./components/ItemsData";
import { errorProcessing, getCurrentDate } from "../../utils/initialisation";
import { restRequest } from "../../utils/restRequest";
import getPurchases from "../../queries/getPurchasesAll";
import deletePurchases from "../../queries/deletePurchases";
import updatePurchases from "../../queries/updatePurchases";
import getPurchasesByDate from "../../queries/getPurchasesByDate";
import SelectPeriod from "./components/SelectPeriod";
import getPurchasesByPeriod from "../../queries/getPurchasesByPeriod";
import SelectName from "./components/SelectName";
import getPurchasesByName from "../../queries/getPurchasesByName";

const StatusCheck = {
  all: 1,
  byDate: 2,
  byPeriod: 3,
  byName: 4
};

const ViewPurchases = () => {
  //info modal
  const [infoModal, setInfoModal] = useState(false);
  const [, setMessageModal] = useState("");
  const [, setSuccessModal] = useState(true);

  const [statusCheck, setStatusCheck] = useState(StatusCheck.all);
  const [itemsData, setItemsData] = useState([]);
  const [selectDate, setSelectDate] = useState(getCurrentDate());
  const [selDateFrom, setSelDateFrom] = useState("");
  const [selDateTo, setSelDateTo] = useState("");
  const [selProduct, setSelProduct] = useState({});

  const onClickButtonLoad = () => {
    switch (statusCheck) {
      case StatusCheck.byDate:
        getDataByDate().then();
        break;
      case StatusCheck.byPeriod:
        getDataByPeriod().then();
        break;
      case StatusCheck.all:
        getDataByAll().then();
        break;
      case StatusCheck.byName:
        getDataByName().then();
        break;
      default:
        break;
    }
  };
  const getCurrentDateFromTo = () => {
    const from = new Date();
    from.setDate(1);
    const to = new Date();
    to.setMonth(to.getMonth() + 1, 1);
    to.setDate(to.getDate() - 1);

    setSelDateFrom(getCurrentDate(from));
    setSelDateTo(getCurrentDate(to));
  };
  const getDataByAll = async () => {
    try {
      const objParams = getPurchases();
      const purchases = await restRequest(objParams);
      if (purchases && purchases.hasOwnProperty("error")) {
        errorProcessing(purchases.error, setMessageModal, setInfoModal, setSuccessModal);
        setItemsData([]);
      } else {
        setItemsData(purchases);
      }
    } catch (e) {
      errorProcessing("Что-то пошло не так", setMessageModal, setInfoModal, setSuccessModal);
      setItemsData([]);
    }
  };
  const getDataByDate = async () => {
    try {
      const objParams = getPurchasesByDate(selectDate);
      const purchases = await restRequest(objParams);
      console.log(purchases);
      if (purchases && purchases.hasOwnProperty("error")) {
        errorProcessing(purchases.error, setMessageModal, setInfoModal, setSuccessModal);
        setItemsData([]);
      } else {
        setItemsData(purchases);
      }
    } catch (e) {
      errorProcessing("Что-то пошло не так", setMessageModal, setInfoModal, setSuccessModal);
      setItemsData([]);
    }
  };
  const getDataByPeriod = async () => {
    try {
      const objParams = getPurchasesByPeriod(selDateFrom, selDateTo);
      const purchases = await restRequest(objParams);
      console.log(purchases);
      if (purchases && purchases.hasOwnProperty("error")) {
        errorProcessing(purchases.error, setMessageModal, setInfoModal, setSuccessModal);
        setItemsData([]);
      } else {
        setItemsData(purchases);
      }
    } catch (e) {
      errorProcessing("Что-то пошло не так", setMessageModal, setInfoModal, setSuccessModal);
      setItemsData([]);
    }
  };
  const getDataByName = async () => {
    console.log(selProduct);
    try {
      const objParams = getPurchasesByName(selProduct._id);
      const purchases = await restRequest(objParams);
      console.log(purchases);
      if (purchases && purchases.hasOwnProperty("error")) {
        errorProcessing(purchases.error, setMessageModal, setInfoModal, setSuccessModal);
        setItemsData([]);
      } else {
        setItemsData(purchases);
      }
    } catch (e) {
      errorProcessing("Что-то пошло не так", setMessageModal, setInfoModal, setSuccessModal);
      setItemsData([]);
    }
  };
  const removeItemPurchases = async (purchaseID) => {
    try {
      const objParams = deletePurchases(purchaseID);
      const purchases = await restRequest(objParams);
      if (purchases && purchases.hasOwnProperty("error")) {
        errorProcessing(purchases.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        onClickButtonLoad();
      }
    } catch (e) {
      errorProcessing("Что-то пошло не так", setMessageModal, setInfoModal, setSuccessModal);
      setItemsData([]);
    }
  };
  const updateItemPurchases = async (purchaseID, newPrice, newQuantity) => {
    try {
      const objParams = updatePurchases(purchaseID, newPrice, newQuantity);
      const purchases = await restRequest(objParams);
      if (purchases && purchases.hasOwnProperty("error")) {
        errorProcessing(purchases.error, setMessageModal, setInfoModal, setSuccessModal);
      } else {
        onClickButtonLoad();
      }
    } catch (e) {
      errorProcessing("Что-то пошло не так", setMessageModal, setInfoModal, setSuccessModal);
      setItemsData([]);
    }
  };
  const getFunctionFroLoadData = () => {
    if (itemsData) {
      return itemsData.map((item, index) => (
        <ItemsData
          key={index}
          onDelete={removeItemPurchases}
          onUpdate={updateItemPurchases}
          {...item}
        />
      ));
    }
    return null;
  };
  const getSumPrice = () => {
    const initialValue = 0;
    const sum = itemsData.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.price;
    }, initialValue);
    return sum.toFixed(2);
  };
  const onChangeStatus = (status) => {
    if (statusCheck === StatusCheck.byName) {
      setSelProduct({});
    }
    setStatusCheck(status);
    setItemsData([]);

  };
  useEffect(() => {
    getCurrentDateFromTo();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container_sections}>
        <div className={style.infoTitle}>
          <div className={style.headerInfo}>
            <span>сортировать по</span>
          </div>
          <div className={style.itemInfo} onClick={() => onChangeStatus(StatusCheck.all)}>
            <span>все</span>
            <Icon name="radioButton" check={statusCheck === StatusCheck.all} />
          </div>
          <div className={style.itemInfo} onClick={() => onChangeStatus(StatusCheck.byDate)}>
            <span>по дате</span>
            <Icon name="radioButton" check={statusCheck === StatusCheck.byDate} />
          </div>
          <div className={style.itemInfo} onClick={() => onChangeStatus(StatusCheck.byPeriod)}>
            <span>период</span>
            <Icon name="radioButton" check={statusCheck === StatusCheck.byPeriod} />
          </div>
          <div className={style.itemInfo} onClick={() => onChangeStatus(StatusCheck.byName)}>
            <span>по товару</span>
            <Icon name="radioButton" check={statusCheck === StatusCheck.byName} />
          </div>
          <div className={style.itemInfo + " " + style.itemInfoSum}>
            <span>{getSumPrice()}</span>
          </div>
        </div>
        <div className={style.infoCredit}>
          {statusCheck === StatusCheck.byDate && <SelectDate onSelectDate={setSelectDate} />}
          {statusCheck === StatusCheck.byPeriod && (
            <SelectPeriod
              dateFrom={selDateFrom}
              dateTo={selDateTo}
              setDateFrom={setSelDateFrom}
              setDateTo={setSelDateTo}
            />
          )}
          {statusCheck === StatusCheck.byName && (
            <SelectName productDefault={selProduct} setProductDefault={setSelProduct} />
          )}
          <div className={style.containerData}>{getFunctionFroLoadData()}</div>
        </div>
        <div className={style.infoFooter}>
          <Button
            title="загрузить"
            clickCallBack={onClickButtonLoad}
            className={style.customButton}
          />
        </div>

        <ModalInfo
          isOpen={infoModal}
          message="Всем привет дорогие. Это ТЕСТ!!!"
          success={true}
          closeModalInfo={setInfoModal}
          duration={6000}
        />
      </div>
    </div>
  );
};

ViewPurchases.propTypes = {
  // bla: PropTypes.string,
};

ViewPurchases.defaultProps = {
  // bla: 'test',
};

export default ViewPurchases;
