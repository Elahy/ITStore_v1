import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const setListofUser = (userList) => ({
  type: ActionTypes.SET_USER_LIST,
  payload: userList,
});

// export const setCurrentProduct = (user) => ({
//   type: ActionTypes.SET_CURRENT_USER,
//   payload: user,
// });

export const addUser = (response) => ({
  type: ActionTypes.ADD_USER,
  payload: response,
});

// export const editProduct = (response) => ({
//   type: ActionTypes.UPDATE_A_PRODUCT,
//   payload: response,
// });
// export const deleteProduct = (response) => ({
//   type: ActionTypes.DELETE_A_PRODUCT,
//   payload: response,
// });

export const requestUserList = () => {
  return async (dispatch, getState) => {
    const { userInfoStore } = getState();
    const token = userInfoStore.token;
    const response = await axios({
      method: "GET",
      url: "http://localhost:8080/user",
      headers: { authorization: `bearer ${token}` },
    });
    dispatch(setListofUser(response.data));
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

// export const updateProduct = (product) => {
//   return async (dispatch) => {
//     const response = await axios.put(
//       `https://fakestoreapi.com/products/${product.id}`,

//       {
//         title: product.title,
//         price: product.price,
//         description: product.dexcription,
//         image: product.image,
//         category: product.category,
//       }
//     );
//     dispatch(editProduct(response));
//     dispatch(setLoaderValue(false));
//     // console.log(response, "===response from update");
//   };
// };

export const requestAddUser = (user) => {
  return async (dispatch, getState) => {
    try {
      const { userInfoStore } = getState();
      const token = userInfoStore.token;
      const response = await axios.post(
        "http://localhost:8080/user",
        {
          address: {
            geolocation: {
              lat: "0",
              long: "0",
            },
            city: user.city,
            street: "0",
            number: user.streetNumber,
            zipcode: user.zipcode,
          },
          role: user.role,
          email: user.email,
          username: user.username,
          phone: user.phone,
          password: user.password,
        },
        {
          headers: { authorization: `bearer ${token}` },
        }
      );
      dispatch(addUser(response.data));
      dispatch(setLoaderValue(false));
      console.log(response, "===response from request");
    } catch (err) {
      console.error(err, "===response from error");
    }
  };
};
