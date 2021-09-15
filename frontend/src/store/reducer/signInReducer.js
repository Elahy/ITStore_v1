import { ActionTypes } from "../ActionTypes";

const initialState = {
  email: null,
  role: null,
  token: null,
  errorMessage: null,
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        email: action.payload?.user,
        role: action.payload.role,
        token: action.payload.token,
      };
    case ActionTypes.SIGN_IN_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default signInReducer;
