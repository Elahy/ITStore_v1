import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const setListofOrder = (productList) => ({
  type: ActionTypes.UPDATE_ORDER_LIST,
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

export const requestOrderList = () => {
  return async (dispatch, getState) => {
    const { userInfoStore } = getState();
    console.log("requestEditProduct Call");
    const token = userInfoStore.token;
    const response = await axios({
      method: "GET",
      url: "http://localhost:8080/order",
      headers: { authorization: `bearer ${token}` },
    });
    dispatch(setListofOrder(response.data));
    dispatch(setLoaderValue(false));
  };
};

// export const requestProductDetails = (productId) => {
//   return async (dispatch) => {
//     const response = await axios({
//       method: "GET",
//       url: `http://localhost:8080/products/${productId}`,
//     });

//     dispatch(setCurrentProduct(response.data));
//     dispatch(setLoaderValue(false));
//   };
// };

// export const requestDeleteProduct = (productId) => {
//   return async (dispatch) => {
//     const response = await axios.delete(
//       `https://fakestoreapi.com/products/${productId}`
//     );
//     dispatch(deleteProduct(response));
//     dispatch(setLoaderValue(false));
//   };
// };

// export const requestEditProduct = (product) => {
//   return async (dispatch, getState) => {
//     try {
//       const { userInfoStore } = getState();
//       console.log("requestEditProduct Call");
//       const token = userInfoStore.token;
//       const response = await axios.patch(
//         `http://localhost:8080/products/${product._id}`,
//         {
//           title: product.title,
//           price: parseInt(product.price, 10),
//           description: product.description,
//           image: product.image,
//           stock: product.stock,
//           category: product.category,
//         },
//         {
//           headers: { authorization: `bearer ${token}` },
//         }
//       );
//       dispatch(editProduct(response));
//       dispatch(setLoaderValue(false));
//       console.log(response, "===response from Edit product Request");
//     } catch (err) {
//       console.error(err, "=== error from Edit product Request");
//     }
//   };
// };
