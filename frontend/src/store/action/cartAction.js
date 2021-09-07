import axios from "axios";
import { ActionTypes } from "../ActionTypes";
import { setLoaderValue } from "./loaderAction";

export const addToCart = (data) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: data.products,
});

export const placeorder = (data) => ({
  type: ActionTypes.PLACE_ORDER,
  payload: data.products,
});

// fetch("{BASE_URL}/cart")
//   .then((res) => res.json())
//   .then((json) => console.log(json));

export const requestAddToCart = (item) => {
  const id = item.product._id;
  console.log(item, "===Id from Cart");
  return async (dispatch, getState) => {
    try {
      const { userInfoStore } = getState();
      const token = userInfoStore.token;
      const response = await axios.post(
        "http://localhost:8080/cart",
        {
          product: {
            id: id,
            quantity: item.quantity,
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

export const requestCheckout = () => {
  return async (dispatch, getState) => {
    try {
      const { userInfoStore } = getState();
      const token = userInfoStore.token;
      const response = await axios.get("http://localhost:8080/order/checkout", {
        headers: { authorization: `bearer ${token}` },
      });
      dispatch(placeorder(response.data));
      dispatch(setLoaderValue(false));
      console.log(response.data, "===response from request");
    } catch (err) {
      console.error(err, "===response from error");
    }
  };
};
