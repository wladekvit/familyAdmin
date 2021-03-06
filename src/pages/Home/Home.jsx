/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import style from "./Home.module.scss";
import Button from "../../components/Button";
import { useModalContext } from "../../components/ModalWrapper/ModalWrapper";

const Home = () => {
  const { setParamsIfoModal } = useModalContext();
  const onClickButtonUpdate = async () => {
    setParamsIfoModal(true, "Привет", true);
  };

  // const changeCategories = () => {
  //   console.log("STORE WORKING!!!", store.getState());
  // }



  // useEffect(() => {
  //   store.subscribe(changeCategories);
  // }, []);

  return (
    <div className={style.wrapper}>
      {console.log("%cRENDER COMPONENT Home", "color: #00ff00")}
      <h2>Приходы и расходы</h2>
      <div className={style.container_sections}>
        <div className={style.infoTitle}>
          <span>поступление средств</span>
        </div>
        <div className={style.infoCredit}>
          <span>0</span>
        </div>
        <Button title="обновить" clickCallBack={onClickButtonUpdate} />
      </div>
    </div>
  );
};

Home.propTypes = {
  setParamsIfoModal: PropTypes.func
};

Home.defaultProps = {
  setParamsIfoModal: () => {}
};

export default Home;
