import { categoriesDataStorage, utilsDataStorage } from "./constans";

export const restRequest = async function (objParams, noCache = false) {
  if (!noCache) {
    let localData = getCacheRequest(objParams)
    if (localData) {
      return localData;
    }
  }

  try {
    const url = "http://192.168.0.156:3003/api";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objParams)
    });

    const result = await response.json();
    
    if (objParams.action === "getCategories") {
      window.sessionStorage.setItem(categoriesDataStorage, JSON.stringify(result));
    } else if (objParams.action === "getUnits") {
      window.sessionStorage.setItem(utilsDataStorage, JSON.stringify(result));
    }
    /*else if (objParams.action === "getProducts") {
      window.sessionStorage.setItem(productsDataStorage, JSON.stringify(result));
    }*/

    return result;
  } catch (e) {
    console.log("ERROR!!!");
    return { error: { e21: "Сервер не отвечает" } };
  }
};


function getCacheRequest(objParams) {
  let localData;
  if (objParams.action === "getCategories") {
    localData = window.sessionStorage.getItem(categoriesDataStorage);
  } else if (objParams.action === "getUnits") {
    localData = window.sessionStorage.getItem(utilsDataStorage);
  }
  /*else if (objParams.action === "getProducts") {
    localData = window.sessionStorage.getItem(productsDataStorage);
  }
  */
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
}
