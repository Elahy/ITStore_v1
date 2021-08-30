import { ActionTypes } from "../ActionTypes";

const initialState = {
  email: null,
  role: null,
  token: null,
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        email: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default signInReducer;
