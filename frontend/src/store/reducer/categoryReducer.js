import { ActionTypes } from "../ActionTypes";

const initialState = {
  categoryList: [],
  categoryAdded: null,
  currentProduct: null,
  productEdited: null,
  productDeleted: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_A_PRODUCT:
      return { ...state, productEdited: action.payload };
    case ActionTypes.SET_CURRENT_PRODUCT:
      return { ...state, currentProduct: action.payload };
    case ActionTypes.UPDATE_CATEGORY_LIST:
      return { ...state, categoryList: action.payload };
    case ActionTypes.ADD_CATEGORY:
      return { ...state, categoryAdded: action.payload };
    case ActionTypes.DELETE_A_PRODUCT:
      return { ...state, productDeleted: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;
