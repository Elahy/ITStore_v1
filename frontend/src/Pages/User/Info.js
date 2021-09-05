import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { setLoaderValue } from "../../store/action/loaderAction";
import { requestMyInfo } from "../../store/action/signInAction";

const useStyles = makeStyles({
  root: {
    width: 300,
    marginLeft: "40%",
    textAlign: "center",
  },
});

function Info() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { myInfoStore, loaderStore } = useSelector((store) => store);
  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestMyInfo());
  }, [dispatch]);

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div className={classes.root}>
          <p>First Name: {myInfoStore.userInfo.firstname}</p>
          <p>Last Name: {myInfoStore.userInfo.lastname}</p>
          <p>Email: {myInfoStore.userInfo.email}</p>
          <p>Phone: {myInfoStore.userInfo.phone}</p>
          <p>Address</p>
          <p>City: {myInfoStore.userInfo.address?.city}</p>
          <p>Road Number: {myInfoStore.userInfo.address?.number}</p>
          <p>Zipcode: {myInfoStore.userInfo.address?.zipcode}</p>
        </div>
      )}
    </>
  );
}

export default Info;
