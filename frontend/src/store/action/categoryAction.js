import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const setListofCategory = (categoryList) => ({
  type: ActionTypes.UPDATE_CATEGORY_LIST,
  payload: categoryList,
});

export const setCurrentCategory = (category) => ({
  type: ActionTypes.SET_CURRENT_CATEGORY,
  payload: category,
});

export const setCurrentCategoryId = (categoryId) => ({
  type: ActionTypes.SET_CURRENT_CATEGORY_ID,
  payload: categoryId,
});

export const addCategory = (response) => ({
  type: ActionTypes.ADD_CATEGORY,
  payload: response,
});

export const editCategory = (response) => ({
  type: ActionTypes.UPDATE_A_CATEGORY,
  payload: response,
});

export const deleteCategory = (response) => ({
  type: ActionTypes.DELETE_A_CATEGORY,
  payload: response,
});

export const requestCategoryList = () => {
  return async (dispatch) => {
    const response = await axios({
      method: "GET",
      url: "http://fake-comb.herokuapp.com/category",
    });
    dispatch(setListofCategory(response.data));
    console.log(response, "RESponse from GET Category List Action");
    dispatch(setLoaderValue(false));
  };
};

export const requestCategoryDetails = (categoryId) => {
  return async (dispatch) => {
    const response = await axios({
      method: "GET",
      url: `http://fake-comb.herokuapp.com/category/${categoryId}`,
    });

    dispatch(setCurrentCategory(response.data));
    dispatch(setLoaderValue(false));
  };
};

export const requestDeleteCategory = (categoryId) => {
  return async (dispatch, getState) => {
    const { signInStore } = getState();
    const token = signInStore.token;
    const response = await axios({
      method: "DELETE",
      url: `http://fake-comb.herokuapp.com/category/${categoryId}`,
      headers: { authorization: `bearer ${token}` },
    });
    dispatch(deleteCategory(response));
    dispatch(setLoaderValue(false));
  };
};

export const requestEditCategory = (category) => {
  return async (dispatch, getState) => {
    console.log(category, "===requestEditCategory");
    try {
      const { signInStore } = getState();
      console.log("requestEditProduct Call");
      const token = signInStore.token;
      const response = await axios.patch(
        `http://fake-comb.herokuapp.com/category/${category._id}`,
        {
          name: category.name,
          description: category.description,
        },
        {
          headers: { authorization: `bearer ${token}` },
        }
      );
      dispatch(editCategory(response));
      dispatch(setLoaderValue(false));
      console.log(response, "===response from Edit product Request");
    } catch (err) {
      console.error(err, "=== error from Edit product Request");
    }
  };
};

export const requestAddCategory = (category) => {
  return async (dispatch, getState) => {
    try {
      const { signInStore } = getState();
      const token = signInStore.token;
      const response = await axios.post(
        "http://fake-comb.herokuapp.com/category",
        {
          name: category.name,
          description: category.description,
          // image: product.image,
        },
        {
          headers: { authorization: `bearer ${token}` },
        }
      );
      dispatch(addCategory(response));
      dispatch(setLoaderValue(false));
      console.log(response, "===response from request");
    } catch (err) {
      console.error(err, "===response from error");
    }
  };
};
