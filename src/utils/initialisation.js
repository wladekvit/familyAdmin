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
  setMessageModal,
  setInfoModal,
  setSuccessModal
) => {
  return new Promise((resolve, reject) => {
    const objParams = getProducts(selectCategory.id);
    restRequest(objParams).then((products) => {
      if (products && products.hasOwnProperty("error")) {
        errorProcessing(products.error, setMessageModal, setInfoModal, setSuccessModal);
        reject();
      } else {
        products.sort((a, b) => (a.name > b.name ? 1 : -1));
        resolve(products);
      }
    });
  });
};