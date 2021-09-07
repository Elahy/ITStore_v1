import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const setListofOrder = (productList) => ({
  type: ActionTypes.UPDATE_ORDER_LIST,
  payload: productList,
});

export const updateOrder = (response) => ({
  type: ActionTypes.UPDATE_A_ORDER,
  payload: response,
});

export const myOrder = (response) => ({
  type: ActionTypes.GET_MY_ORDER,
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

export const requestUpdateOrder = (order) => {
  return async (dispatch, getState) => {
    const { userInfoStore } = getState();
    const token = userInfoStore.token;
    console.log(order.status, "order Status");
    const response = await axios({
      method: "PATCH",
      url: `http://localhost:8080/order/${order._id}`,
      headers: { authorization: `bearer ${token}` },
      data: {
        status: order.status,
      },
    });
    dispatch(updateOrder(response));
    dispatch(setLoaderValue(false));
  };
};

export const requestMyOrder = () => {
  return async (dispatch, getState) => {
    const { userInfoStore } = getState();
    console.log("requestMyOrder Successfull");
    const token = userInfoStore.token;
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8080/order/my-order",
        headers: { authorization: `bearer ${token}` },
      });
      dispatch(myOrder(response.data));
      dispatch(setLoaderValue(false));
    } catch (err) {
      dispatch(setLoaderValue(false));
      console.error(err, "===Error");
    }
  };
};
