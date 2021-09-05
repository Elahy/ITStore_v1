import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const signIn = (response) => ({
  type: ActionTypes.SIGN_IN,
  payload: response,
});

export const myInfo = (response) => ({
  type: ActionTypes.GET_MY_INFO,
  payload: response,
});

export const myOrder = (response) => ({
  type: ActionTypes.GET_MY_ORDER,
  payload: response,
});

export const requestSignIn = (credential) => {
  console.log(JSON.stringify(credential), "Signin");
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8080/signin",
        data: {
          email: credential.email,
          password: credential.password,
        },
      });
      dispatch(signIn(response.data.userInfo));
      dispatch(setLoaderValue(false));

      console.log("Signin Successfull");
    } catch (err) {
      dispatch(setLoaderValue(false));
      console.error(err, "===Error");
    }
  };
};

export const requestMyInfo = () => {
  return async (dispatch, getState) => {
    const { userInfoStore } = getState();
    console.log("requestMyInfo Successfull");
    const token = userInfoStore.token;
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8080/my-detail",
        headers: { authorization: `bearer ${token}` },
      });
      dispatch(myInfo(response.data));
      dispatch(setLoaderValue(false));
    } catch (err) {
      dispatch(setLoaderValue(false));
      console.error(err, "===Error");
    }
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
        url: "http://localhost:8080/my-order",
        headers: { authorization: `bearer ${token}` },
      });
      dispatch(myInfo(response.data));
      dispatch(setLoaderValue(false));
    } catch (err) {
      dispatch(setLoaderValue(false));
      console.error(err, "===Error");
    }
  };
};
