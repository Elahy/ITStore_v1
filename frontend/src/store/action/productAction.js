import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const setListofProduct = (productList) => ({
  type: ActionTypes.UPDATE_PRODUCT_LIST,
  payload: productList,
});

export const setCurrentProduct = (product) => ({
  type: ActionTypes.SET_CURRENT_PRODUCT,
  payload: product,
});

export const addProduct = (response) => ({
  type: ActionTypes.ADD_PRODUCT,
  payload: response,
});

export const editProduct = (response) => ({
  type: ActionTypes.UPDATE_A_PRODUCT,
  payload: response,
});
export const deleteProduct = (response) => ({
  type: ActionTypes.DELETE_A_PRODUCT,
  payload: response,
});

export const requestProductList = () => {
  return async (dispatch) => {
    const response = await axios({
      method: "GET",
      url: "http://localhost:8080/products",
    });
    dispatch(setListofProduct(response.data));
    dispatch(setLoaderValue(false));
  };
};

export const requestProductByCategory = (categoryId) => {
  return async (dispatch) => {
    const response = await axios({
      method: "GET",
      url: `http://localhost:8080/products/category/${categoryId}`,
    });
    dispatch(setListofProduct(response.data));
    dispatch(setLoaderValue(false));
  };
};

export const requestProductDetails = (productId) => {
  return async (dispatch) => {
    const response = await axios({
      method: "GET",
      url: `http://localhost:8080/products/${productId}`,
    });

    dispatch(setCurrentProduct(response.data));
    dispatch(setLoaderValue(false));
  };
};

export const requestDeleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const { signInStore } = getState();
    console.log("requestDeleteProduct Call");
    const token = signInStore.token;
    const response = await axios.delete(
      `http://localhost:8080/products/${productId}`,
      {
        headers: { authorization: `bearer ${token}` },
      }
    );
    dispatch(deleteProduct(response));
    dispatch(setLoaderValue(false));
  };
};

export const requestEditProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      const { signInStore } = getState();
      console.log(product, "requestEditProduct Call");
      const token = signInStore.token;
      const response = await axios.patch(
        `http://localhost:8080/products/${product._id}`,
        {
          title: product.title,
          price: parseInt(product.price, 10),
          description: product.description,
          stock: product.stock,
          // category: { _id: product.category },
          category_id: product.category,
        },
        {
          headers: { authorization: `bearer ${token}` },
        }
      );
      dispatch(editProduct(response));
      dispatch(setLoaderValue(false));
      console.log(response, "===response from Edit product Request");
    } catch (err) {
      console.error(err, "=== error from Edit product Request");
    }
  };
};
export const requestAddProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      const { signInStore } = getState();
      const token = signInStore.token;
      const response = await axios.post(
        "http://localhost:8080/products",
        {
          title: product.title,
          price: parseInt(product.price, 10),
          description: product.description,
          image: product.image,
          stock: product.stock,
          category: { _id: product.category },
        },
        {
          headers: { authorization: `bearer ${token}` },
        }
      );
      dispatch(addProduct(response));
      dispatch(setLoaderValue(false));
      console.log(response, "===response from request");
    } catch (err) {
      console.error(err, "===response from error");
    }
  };
};
