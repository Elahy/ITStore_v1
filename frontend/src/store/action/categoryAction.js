import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const setListofCategory = (categoryList) => ({
  type: ActionTypes.UPDATE_CATEGORY_LIST,
  payload: categoryList,
});

export const setCurrentProduct = (product) => ({
  type: ActionTypes.SET_CURRENT_PRODUCT,
  payload: product,
});

export const addCategory = (response) => ({
  type: ActionTypes.ADD_CATEGORY,
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

export const requestCategoryList = () => {
  return async (dispatch) => {
    const response = await axios({
      method: "GET",
      url: "http://localhost:8080/category",
    });
    dispatch(setListofCategory(response.data));
    console.log(response, "RESponse from GET Category List Action");
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

export const requestAddCategory = (category) => {
  return async (dispatch, getState) => {
    try {
      const { userInfoStore } = getState();
      const token = userInfoStore.token;
      const response = await axios.post(
        "http://localhost:8080/category",
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
