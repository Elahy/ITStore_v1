import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setLoaderValue } from "../../store/action/loaderAction";
import Loader from "../../Components/Loader";
import { useHistory } from "react-router";
import {
  requestDeleteUser,
  requestUserDetails,
  requestUserList,
  setCurrentUserId,
  setView,
} from "../../store/action/userAction";

const useStyles = makeStyles({
  root: {
    display: "flex",
    // minHeight: "70vh",
  },
  image: {
    maxWidth: "60px",
    maxHeight: "60px",
    padding: "0 1% ",
  },
  button: {
    maxHeight: "35px",
    padding: "8px 20px ",
    margin: "0 1%",
  },
});

function Users() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { allUserStore, loaderStore } = useSelector((store) => store);
  const userList = allUserStore.userList;
  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestUserList());
  }, [dispatch]);
  const updateHandler = (e) => {
    console.log(e._id, "===event of edit");
    dispatch(requestUserDetails(e._id));
    dispatch(setCurrentUserId(e._id));
    dispatch(setView("edit"));
  };
  const deleteHandler = (e) => {
    dispatch(requestDeleteUser(e._id));
    history.push("/success");
  };

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div>
          {userList.map((user) => (
            <div key={user._id} className={classes.root}>
              {console.log(user.email, "===email")}
              <p className={classes.button}>{user.username}</p>
              <p className={classes.button}>{user.email}</p>
              <p className={classes.button}>{user.phone}</p>
              <p className={classes.button}>{user.address?.city}</p>

              <button
                className={classes.button}
                onClick={() => updateHandler(user)}
              >
                Edit
              </button>
              <button
                className={classes.button}
                onClick={() => deleteHandler(user)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Users;
