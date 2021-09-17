import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Miscellaneous/Loader";
import UpdateUser from "../../Dashboard/User/UpdateUser";
import { setLoaderValue } from "../../store/action/loaderAction";
import { requestMyInfo } from "../../store/action/userAction";
import {
  requestUserDetails,
  setCurrentUserId,
} from "../../store/action/userAction";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    margin: "5%",
  },
  header: {
    display: "flex",
  },
  userImage: {
    width: "70px",

    margin: "0 5% 2% 5%",
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

  const [view, setView] = useState("");

  const handleEditUserInfo = (e) => {
    dispatch(requestUserDetails(e._id));
    dispatch(setCurrentUserId(e._id));
    setView("edit");
  };

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : view === "edit" ? (
        <UpdateUser />
      ) : (
        <div className={classes.root}>
          <div className={classes.header}>
            <img
              src="../images/user.png"
              alt="user"
              className={classes.userImage}
            />
            <h1>
              {myInfoStore.userInfo.firstname} {myInfoStore.userInfo.lastname}
            </h1>
          </div>
          <h3> Personal Info </h3>
          <p>First Name: {myInfoStore.userInfo.firstname}</p>
          <p>Last Name: {myInfoStore.userInfo.lastname}</p>
          <p>Email: {myInfoStore.userInfo.email}</p>
          <p>Phone: {myInfoStore.userInfo.phone}</p>
          <p>Address</p>
          <p>City: {myInfoStore.userInfo.address?.city}</p>
          <p>Road Number: {myInfoStore.userInfo.address?.number}</p>
          <p>Zipcode: {myInfoStore.userInfo.address?.zipcode}</p>
          <Button
            onClick={() => handleEditUserInfo(myInfoStore?.userInfo)}
            variant="contained"
            color="primary"
          >
            Edit Info
          </Button>
        </div>
      )}
    </>
  );
}

export default Info;
