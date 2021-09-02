import { ActionTypes } from "../ActionTypes";

export const addToCart = (product) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: product,
});
