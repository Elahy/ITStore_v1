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

export const setCheckoutItems = (data) => ({
  type: ActionTypes.SET_CHECKOUT_ITEMS,
  payload: data,
});

export const setCartQuantity = (data) => ({
  type: ActionTypes.SET_CART_QUANTITY,
  payload: data,
});

export const requestAddToCart = (item) => {
  const id = item.product._id;
  console.log(item, "===item from Cart");
  return async (dispatch, getState) => {
    try {
      const { signInStore } = getState();
      const token = signInStore.token;
      const response = await axios.post(
        "http://fake-comb.herokuapp.com/cart",
        {
          product: {
            id: id,
            quantity: parseInt(item.quantity, 10),
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
      const { signInStore } = getState();
      const token = signInStore.token;
      const response = await axios.get(
        "http://fake-comb.herokuapp.com/order/checkout",
        {
          headers: { authorization: `bearer ${token}` },
        }
      );
      dispatch(placeorder(response.data));
      dispatch(setLoaderValue(false));
      console.log(response.data, "===response from request");
    } catch (err) {
      console.error(err, "===response from error");
    }
  };
};

export const requestCart = () => {
  return async (dispatch, getState) => {
    try {
      const { signInStore } = getState();
      const token = signInStore.token;
      const response = await axios.get("http://fake-comb.herokuapp.com/cart", {
        headers: { authorization: `bearer ${token}` },
      });
      dispatch(addToCart(response.data));
      dispatch(setLoaderValue(false));
      console.log(response.data, "===response from requestCART");
    } catch (err) {
      console.error(err, "===response from requestCART error");
    }
  };
};
