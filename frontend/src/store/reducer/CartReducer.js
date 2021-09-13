import { ActionTypes } from "../ActionTypes";

const initialState = {
  cart: null,
  itemNumber: 0,
  checkoutItems: null,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === ActionTypes.ADD_TO_CART) {
    return { ...state, cart: action.payload };
  } else if (action.type === ActionTypes.REMOVE_FROM_CART) {
    return { ...state, currentProduct: action.payload };
  } else if (action.type === ActionTypes.SET_CART_QUANTITY) {
    return { ...state, itemNumber: action.payload };
  } else if (action.type === ActionTypes.SET_CHECKOUT_ITEMS) {
    return { ...state, checkoutItems: action.payload };
  } else {
    return state;
  }
};

export default cartReducer;
