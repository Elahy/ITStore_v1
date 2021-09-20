import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";
// import { requestCart } from "./cartAction";

export const signIn = (response) => ({
  type: ActionTypes.SIGN_IN,
  payload: response,
});

export const signInError = (response) => ({
  type: ActionTypes.SIGN_IN_ERROR,
  payload: response,
});

export const requestSignIn = (credential) => {
  console.log(JSON.stringify(credential), "Signin");
  return async (dispatch) => {
    const response = await axios({
      method: "POST",
      url: "http://localhost:8080/signin",
      data: {
        email: credential.email,
        password: credential.password,
      },
    });

    if (response.data.message === "Logged in Successfully") {
      dispatch(signIn(response.data.userInfo));
      dispatch(signInError(null));
      dispatch(setLoaderValue(false));
      // dispatch(requestCart());
    } else {
      dispatch(signInError(response.data.message));
      dispatch(setLoaderValue(false));
    }
  };
};
