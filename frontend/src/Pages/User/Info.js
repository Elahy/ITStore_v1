import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Miscellaneous/Loader";
import { setLoaderValue } from "../../store/action/loaderAction";
import {
  // editUser,
  requestMyInfo,
  setView,
} from "../../store/action/userAction";
import {
  requestUserDetails,
  setCurrentUserId,
} from "../../store/action/userAction";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    margin: "10% 5%",
  },
  header: {
    display: "flex",
  },
  userImage: {
    width: "70px",

    margin: "0 5% 2% 5%",
  },
  info: {
    margin: "5%",
  },
  fName: {
    margin: "0",
    padding: "0",
  },
  personalInfo: {
    marginLeft: "150px",
    fontSize: "23px",
  },
  button: {
    backgroundColor: "gray",
    marginLeft: "200px",
  },
});

function Info() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { myInfoStore, loaderStore } = useSelector((store) => store);
  // const { userEdited } = useSelector((store) => store.allUserStore);

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestMyInfo());
    // dispatch(editUser(null));
  }, [dispatch]);

  const handleEditUserInfo = (userInfo) => {
    dispatch(requestUserDetails(userInfo._id));
    dispatch(setCurrentUserId(userInfo._id));
    dispatch(setView("edit"));
  };

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div className={classes.root}>
          <div className={classes.header}>
            <img
              src="../images/user.png"
              alt="user"
              className={classes.userImage}
            />
            <div>
              <h1 className={classes.fName}>
                {myInfoStore.userInfo.firstname} {myInfoStore.userInfo.lastname}
              </h1>
              <p>@{myInfoStore.userInfo.username}</p>
            </div>
          </div>
          <h3 className={classes.personalInfo}> Personal Info </h3>
          <div className={classes.header}>
            <div className={classes.info}>
              <p>User Name: @{myInfoStore.userInfo.username}</p>
              <p>First Name: {myInfoStore.userInfo.firstname}</p>
              <p>Last Name: {myInfoStore.userInfo.lastname}</p>
              <p>Email: {myInfoStore.userInfo.email}</p>
              <p>Phone: {myInfoStore.userInfo.phone}</p>
            </div>
            <div className={classes.info}>
              <p>Address</p>
              <p>City: {myInfoStore.userInfo.address?.city}</p>
              <p>Road Number: {myInfoStore.userInfo.address?.number}</p>
              <p>Zipcode: {myInfoStore.userInfo.address?.zipcode}</p>
            </div>
          </div>
          <Button
            onClick={() => handleEditUserInfo(myInfoStore?.userInfo)}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Edit Info
          </Button>
        </div>
      )}
    </>
  );
}

export default Info;
