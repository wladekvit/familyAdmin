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

const StatusCheck = {
  all: 1,
  byDate: 2,
  byPeriod: 3,
  byName: 4
};

const ViewPurchases = () => {
  //info modal
  const [infoModal, setInfoModal] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [successModal, setSuccessModal] = useState(true);

  const [statusCheck, setStatusCheck] = useState(StatusCheck.all);
  const [itemsData, setItemsData] = useState([]);
  const [selectDate, setSelectDate] = useState(getCurrentDate());

  const onClickButtonLoad = () => {
    switch (statusCheck) {
      case StatusCheck.byDate:
        getDataByDate();
        break;
      case StatusCheck.byPeriod:
        getDataByPeriod();
        break;
      case StatusCheck.all:
        getDataByAll().then();
        break;
      default:
        break;
    }
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
    console.log(selectDate);
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

  const getDataByPeriod = () => {
    setItemsData([]);
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

  const onChangeStatus = (status) => {
    setStatusCheck(status);
    setItemsData([]);
  };

  useEffect(() => {}, []);

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
            <span>по имени</span>
            <Icon name="radioButton" check={statusCheck === StatusCheck.byName} />
          </div>
        </div>
        <div className={style.infoCredit}>
          {statusCheck === StatusCheck.byDate && <SelectDate onSelectDate={setSelectDate} />}
          <div className={style.containerData}>{getFunctionFroLoadData()}</div>
        </div>
        <Button title="загрузить" clickCallBack={onClickButtonLoad} className={style.customButton} />
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
