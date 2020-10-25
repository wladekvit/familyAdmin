import React, { useState } from "react";
// import PropTypes from "prop-types";
import style from "./Home.module.scss";
import Button from "../../components/Button";
import ModalInfo from "../../components/ModalInfo";
// import { restRequest } from "../../utils/restRequest";

const Home = () => {
  const [infoModal, setInfoModal] = useState(false);
  const onClickButtonUpdate = async () => {
    setInfoModal(true);
  };
  return (
    <div className={style.wrapper}>
      <h2>Приходы и расходы</h2>
      <div className={style.container_sections}>
        <div className={style.infoTitle}>
          <span>поступление средств</span>
        </div>
        <div className={style.infoCredit}>
          <span>12 000 грн</span>
        </div>
        <Button title="обновить" clickCallBack={onClickButtonUpdate} />
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

Home.propTypes = {
  // bla: PropTypes.string,
};

Home.defaultProps = {
  // bla: 'test',
};

export default Home;
