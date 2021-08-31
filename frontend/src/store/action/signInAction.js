import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const signIn = (response) => ({
  type: ActionTypes.SIGN_IN,
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
      console.log("Signin Successfull");
    } catch (err) {
      dispatch(setLoaderValue(false));
      console.error(err, "===Error");
    }
  };
};
