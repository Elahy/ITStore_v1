import { ActionTypes } from "../ActionTypes";

const initialState = {
  userInfo: [],
  myOrder: [],
};

const myInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MY_INFO:
      return { ...state, userInfo: action.payload };
    case ActionTypes.GET_MY_ORDER:
      return { ...state, myOrder: action.payload };

    default:
      return state;
  }
};

export default myInfoReducer;
