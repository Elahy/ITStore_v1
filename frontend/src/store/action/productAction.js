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
  return async (dispatch) => {
    const response = await axios.delete(
      `https://fakestoreapi.com/products/${productId}`
    );
    dispatch(deleteProduct(response));
    dispatch(setLoaderValue(false));
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    const response = await axios.put(
      `https://fakestoreapi.com/products/${product.id}`,

      {
        title: product.title,
        price: product.price,
        description: product.dexcription,
        image: product.image,
        category: product.category,
      }
    );
    dispatch(editProduct(response));
    dispatch(setLoaderValue(false));
    // console.log(response, "===response from update");
  };
};

export const requestAddProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      const { userInfoStore } = getState();
      const token = userInfoStore.token;
      // console.log(token);
      // console.log(
      //   JSON.stringify({
      //     title: product.title,
      //     price: parseInt(product.price, 10),
      //     description: product.description,
      //     image: product.image,
      //     stock: product.stock,
      //     category: product.category,
      //   })
      // );
      const response = await axios({
        method: "POST",
        url: "http://localhost:8080/products",
        headers: {
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          title: product.title,
          price: parseInt(product.price, 10),
          description: product.description,
          image: product.image,
          stock: product.stock,
          category: product.category,
        }),
      });
      dispatch(addProduct(response));
      dispatch(setLoaderValue(false));
      console.log(response, "===response from request");
    } catch (err) {
      console.error(err, "===response from error");
    }
  };
};
