import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./Home.module.scss";
import Button from "../../components/Button";
import ModalContext from "../../components/ModalContext";

const Home = () => {
  const { setParamsIfoModal } = useContext(ModalContext);
  const [count, setCount] = useState(0);
  const onClickButtonUpdate = async () => {
    setParamsIfoModal(true, "Привет", false);
  };

  // useEffect(() => {
  //   setCount((prev) => prev + 1);
  // });

  return (
    <div className={style.wrapper}>
      {console.log("%cRENDER COMPONENT Home", "color: #00ff00")}
      <h2>Приходы и расходы</h2>
      <div className={style.container_sections}>
        <div className={style.infoTitle}>
          <span>поступление средств</span>
        </div>
        <div className={style.infoCredit}>
          <span>{count}</span>
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
