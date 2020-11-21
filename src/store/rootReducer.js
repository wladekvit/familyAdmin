import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../utils/constans";

export function rootReducer(state, action) {
  switch (action.type) {
    case "ADD_CATEGORY":
      return state;
    case "DELETE_CATEGORY":
      return state;
    case "CHANGE_CATEGORY":
      return state;
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