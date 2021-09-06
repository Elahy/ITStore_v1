import { ActionTypes } from "../ActionTypes";

const initialState = {
  categoryList: [],
  categoryAdded: null,
  currentCategory: null,
  currentCategoryId: null,
  categoryEdited: null,
  categoryDeleted: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_A_CATEGORY:
      return { ...state, categoryEdited: action.payload };
    case ActionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    case ActionTypes.SET_CURRENT_CATEGORY_ID:
      return { ...state, currentCategory: action.payload };
    case ActionTypes.UPDATE_CATEGORY_LIST:
      return { ...state, categoryList: action.payload };
    case ActionTypes.ADD_CATEGORY:
      return { ...state, categoryAdded: action.payload };
    case ActionTypes.DELETE_A_CATEGORY:
      return { ...state, categoryDeleted: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;
