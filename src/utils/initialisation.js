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