import React from "react";
// import PropTypes from "prop-types";
import style from "./Home.module.scss";
import Button from "../../components/Button";
import { restRequest } from "../../utils/restRequest";
import getCategories from "../../queries/getCategories";
import addCategories from "../../queries/addCategories";


const Home = () => {
  const onClickButtonUpdate = async () => {
    // const objParams = addCategories("Напитки");
    const objParams = getCategories();
    restRequest(objParams).then((data) => {
      console.log(data);
    });
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
