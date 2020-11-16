import { restRequest } from "./restRequest";
import getUnits from "../queries/getUnits";
import { utilsDataStorage, categoriesDataStorage } from "./constans";
import getCategories from "../queries/getCategories";
import getProducts from "../queries/getProducts";

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
  if (setMessageModal) {
    setMessageModal(`Ошибка!!! ${errMessage}`);
  }
  setInfoModal(true);
  setSuccessModal(false);
  console.log("error", Object.keys(err)[0]);
};

export const onSelectCategoryUtility = (
  selectCategory,
  setParamsIfoModal
) => {
  return new Promise((resolve, reject) => {
    const objParams = getProducts(selectCategory._id);
    restRequest(objParams).then((products) => {
      if (products && products.hasOwnProperty("error")) {
        setParamsIfoModal(true, products.error, false);
        reject();
      } else {
        products.sort((a, b) => (a.name > b.name ? 1 : -1));
        resolve(products);
      }
    });
  });
};

export const getCurrentDate = (selectionDate) => {
  //format: 2012-06-01
  const date = selectionDate ? new Date(selectionDate) : new Date();
  let day = date.getDate().toString();
  if (day.length === 1) day = `0${day}`;
  let mouth = (date.getMonth() + 1).toString();
  if (mouth.length === 1) mouth = `0${mouth}`;
  const year = date.getFullYear();

  return `${year}-${mouth}-${day}`;
};