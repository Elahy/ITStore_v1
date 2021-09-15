import { ActionTypes } from "../ActionTypes";

const initialState = {
  cart: null,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === ActionTypes.ADD_TO_CART) {
    return { ...state, cart: action.payload };
  } else {
    return state;
  }
};

export default cartReducer;
