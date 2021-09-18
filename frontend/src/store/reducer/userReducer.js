import { ActionTypes } from "../ActionTypes";

const initialState = {
  userList: [],
  currentUser: null,
  currentUserId: null,
  userEdited: null,
  userDeleted: null,
  view: "",
  errorMessage: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_LIST:
      return { ...state, userList: action.payload };
    case ActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case ActionTypes.EDIT_USER:
      return { ...state, userEdited: action.payload };
    case ActionTypes.SET_VIEW:
      return { ...state, view: action.payload };
    case ActionTypes.SET_CURRENT_USER_ID:
      return { ...state, currentUserId: action.payload };
    case ActionTypes.DELETE_A_USER:
      return { ...state, userDeleted: action.payload };
    case ActionTypes.SIGN_IN_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
