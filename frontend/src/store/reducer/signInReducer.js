import { ActionTypes } from "../ActionTypes";

const initState = {
  email: null,
  role: null,
  token: null,
  errorMessage: null,
};

const signInReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        email: action.payload.user,
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
