import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Users from "./Users";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderValue } from "../../store/action/loaderAction";
import { setView } from "../../store/action/userAction";

const useStyles = makeStyles({
  list: {
    display: "flex",
  },
  select: {
    display: "flex",
    textDecoration: "none",
    padding: "10px",
    margin: "1%",
    border: "1px solid black",
    borderRadius: "5px",
    background: "#cdcdcd",
    "&:hover": {
      cursor: "pointer",
      padding: "12px 10px",
      background: "#d1bcbc",
    },
  },
});

function UserBoard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { view } = useSelector((store) => store.allUserStore);

  useEffect(() => {
    dispatch(setLoaderValue(false));
    dispatch(setView("all"));
  }, [dispatch]);

  return (
    <div>
      <ul className={classes.list}>
        <li onClick={() => dispatch(setView("all"))} className={classes.select}>
          User List
        </li>
        <li onClick={() => dispatch(setView("add"))} className={classes.select}>
          Add User
        </li>
      </ul>
      {view === "all" ? (
        <Users setView />
      ) : view === "add" ? (
        <AddUser />
      ) : view === "edit" ? (
        <UpdateUser />
      ) : (
        <p>Select</p>
      )}
    </div>
  );
}

export default UserBoard;
