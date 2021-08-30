import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const signIn = (response) => ({
  type: ActionTypes.SIGN_IN,
  payload: response,
});

export const requestSignIn = () => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:8080/signin");
    dispatch(signIn(response.data.userInfo));
    dispatch(setLoaderValue(false));
  };
};
