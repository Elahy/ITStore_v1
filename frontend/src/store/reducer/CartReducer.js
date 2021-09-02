import { ActionTypes } from "../ActionTypes";

const initialState = {
  cart: null,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === ActionTypes.ADD_TO_CART) {
    return { ...state, productList: action.payload };
  } else if (action.type === ActionTypes.REMOVE_FROM_CART) {
    return { ...state, currentProduct: action.payload };
  } else {
    return state;
  }
};

export default cartReducer;
