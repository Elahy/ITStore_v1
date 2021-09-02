import { ActionTypes } from "../ActionTypes";

const initialState = {
  cart: null,
  item: 0,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === ActionTypes.ADD_TO_CART) {
    return { ...state, cart: action.payload, item: 1 };
  } else if (action.type === ActionTypes.REMOVE_FROM_CART) {
    return { ...state, currentProduct: action.payload };
  } else {
    return state;
  }
};

export default cartReducer;
