import axios from "axios";
import { ActionTypes } from "../ActionTypes";

export const addToCart = (data) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: data.products,
});

// fetch("{BASE_URL}/cart")
//   .then((res) => res.json())
//   .then((json) => console.log(json));

export const requestAddToCart = (product) => {
  const id = product.product._id;
  console.log(id, "===Id from Cart");
  return async (dispatch, getState) => {
    try {
      const { userInfoStore } = getState();
      const token = userInfoStore.token;
      const response = await axios.post(
        "http://localhost:8080/cart",
        {
          product: {
            id: id,
            quantity: 1,
          },
        },
        {
          headers: { authorization: `bearer ${token}` },
        }
      );
      dispatch(addToCart(response.data));
      console.log(response.data, "===response from request");
    } catch (err) {
      console.error(err, "===response from error");
    }
  };
};
