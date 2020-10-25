import {restRequest} from "./restRequest";
import getUnits from "../queries/getUnits";
import {utilsDataStorage, categoriesDataStorage} from "./constans";
import getCategories from "../queries/getCategories";

export const initialisationDataStore = () => {
  let objParams = getUnits();
  restRequest(objParams).then((data) => {
    window.localStorage.setItem(utilsDataStorage, JSON.stringify(data));
  });
  objParams = getCategories();
  restRequest(objParams).then((data) => {
    window.localStorage.setItem(categoriesDataStorage, JSON.stringify(data));
  });
  
};

export const errorProcessing = (err, setMessageModal, setInfoModal, setSuccessModal) => {
  const cod = Object.keys(err)[0];
  const errMessage = err[cod];
  setMessageModal(`Ошибка!!! ${errMessage}`);
  setInfoModal(true);
  setSuccessModal(false);
  console.log("error", Object.keys(err)[0]);
};