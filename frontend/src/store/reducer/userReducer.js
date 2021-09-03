import { ActionTypes } from "../ActionTypes";

const initialState = {
  userList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_LIST:
      return { ...state, userList: action.payload };

    default:
      return state;
  }
};

export default userReducer;
