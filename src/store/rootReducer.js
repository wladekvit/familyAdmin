import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CHANGE_CATEGORY
} from "../utils/constans";
import { restRequest } from "../utils/restRequest";
import getCategories from "../queries/getCategories";

export async function rootReducer (state, action) {
  switch (action.type) {
    case ADD_CATEGORY:
    case DELETE_CATEGORY:
    case CHANGE_CATEGORY:
      const objParams = getCategories();
      const data = await restRequest(objParams, true);
      data.sort((a, b) => a.category > b.category ? 1 : -1)
      return {...state, categories: data};
    case UPDATE_PRODUCT:
      return state;
    case DELETE_PRODUCT:
      return state;
    case ADD_PRODUCT:
      return state;
    default:
      return state;
  }
}
