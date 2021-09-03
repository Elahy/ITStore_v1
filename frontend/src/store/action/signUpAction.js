import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const signUp = (response) => ({
  type: ActionTypes.SIGN_UP,
  payload: response,
});

export const requestSignUp = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:8080/signup", {
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
        firstname: user.fistName,
        lastname: user.lastName,
        email: user.email,
        username: user.username,
        phone: user.phone,
        password: user.password,
      });
      dispatch(signUp(response.data));
      dispatch(setLoaderValue(false));
      console.log(response, "===response from request");
    } catch (err) {
      console.error(err, "===response from error");
    }
  };
};
