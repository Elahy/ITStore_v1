import { ActionTypes } from "../ActionTypes";
import axios from "axios";
import { setLoaderValue } from "./loaderAction";

export const setListofUser = (userList) => ({
  type: ActionTypes.SET_USER_LIST,
  payload: userList,
});

export const setCurrentUser = (user) => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const addUser = (response) => ({
  type: ActionTypes.ADD_USER,
  payload: response,
});

export const editUser = (response) => ({
  type: ActionTypes.EDIT_USER,
  payload: response,
});

export const setCurrentUserId = (response) => ({
  type: ActionTypes.SET_CURRENT_USER_ID,
  payload: response,
});

export const setView = (response) => ({
  type: ActionTypes.SET_VIEW,
  payload: response,
});

export const deleteUser = (response) => ({
  type: ActionTypes.DELETE_A_USER,
  payload: response,
});

export const setMyInfo = (response) => ({
  type: ActionTypes.GET_MY_INFO,
  payload: response,
});

export const requestUserList = () => {
  return async (dispatch, getState) => {
    const { signInStore } = getState();
    const token = signInStore.token;
    const response = await axios({
      method: "GET",
      url: "http://localhost:8080/user",
      headers: { authorization: `bearer ${token}` },
    });
    dispatch(setListofUser(response.data));
    dispatch(setLoaderValue(false));
  };
};

export const requestUserDetails = (userId) => {
  return async (dispatch, getState) => {
    const { signInStore } = getState();
    const token = signInStore.token;
    const response = await axios({
      method: "GET",
      url: `http://localhost:8080/user/${userId}`,
      headers: { authorization: `bearer ${token}` },
    });
    dispatch(setCurrentUser(response.data));
    dispatch(setLoaderValue(false));
  };
};

export const requestDeleteUser = (userId) => {
  return async (dispatch, getState) => {
    const { signInStore } = getState();
    const token = signInStore.token;
    const response = await axios({
      method: "DELETE",
      url: `http://localhost:8080/user/${userId}`,
      headers: { authorization: `bearer ${token}` },
    });
    dispatch(deleteUser(response));
    dispatch(setLoaderValue(false));
  };
};

export const requestEditUser = (user) => {
  return async (dispatch, getState) => {
    const { signInStore } = getState();
    const token = signInStore.token;
    const response = await axios.patch(
      `http://localhost:8080/user/${user._id}`,
      {
        address: {
          geolocation: {
            lat: user.lat,
            long: user.long,
          },
          city: user.city,
          street: user.street,
          number: user.streetNumber,
          zipcode: user.zipcode,
        },
        role: user.role,
        email: user.email,
        username: user.userName,
        phone: user.phone,
        password: user.password,
      },
      {
        headers: { authorization: `bearer ${token}` },
      }
    );
    dispatch(editUser(response));
    dispatch(setLoaderValue(false));
    // console.log(response, "===response from update");
  };
};

export const requestAddUser = (user) => {
  return async (dispatch, getState) => {
    try {
      const { signInStore } = getState();
      const token = signInStore.token;
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

export const requestMyInfo = () => {
  return async (dispatch, getState) => {
    const { signInStore } = getState();
    const token = signInStore.token;
    const response = await axios({
      method: "GET",
      url: `http://localhost:8080/my-detail`,
      headers: { authorization: `bearer ${token}` },
    });
    dispatch(setMyInfo(response.data));
    dispatch(setLoaderValue(false));
  };
};
