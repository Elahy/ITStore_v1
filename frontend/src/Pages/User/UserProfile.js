import { Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signIn } from "../../store/action/signInAction";
import Info from "./Info";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Orders from "./Orders";

const useStyles = makeStyles({
  root: {
    minHeight: "90vh",
  },
  header: {
    textAlign: "center",
    margin: "10px",
    padding: "10px",
  },
  menu: {
    textAlign: "center",
    fontSize: "25px",
  },
  menuItem: {
    display: "flex",
    textDecoration: "none",
    margin: "5px 50px",
    padding: "5px",
    maxWidth: "100%",
    border: "1px solid black",
    borderRadius: "5px",
    background: "#cdcdcd",
    "&:hover": {
      cursor: "pointer",
      padding: "7px 5px",
      background: "#d1bcbc",
    },
  },
});

function UserProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const logOutHandler = () => {
    history.push("/");
    dispatch(signIn(""));
  };
  const [show, setShow] = useState(null);

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Profile</h1>
      <Grid container>
        <Grid item lg={1}></Grid>
        <Grid item lg={3}>
          <p className={classes.menu}>Menu</p>
          <ul>
            <li onClick={() => setShow("info")} className={classes.menuItem}>
              Info
            </li>
            <li onClick={() => setShow("product")} className={classes.menuItem}>
              Product
            </li>
            <li onClick={() => setShow("order")} className={classes.menuItem}>
              Orders
            </li>
          </ul>
        </Grid>
        <Grid item lg={1}></Grid>
        <Grid item lg={5}>
          {show === "info" ? (
            <Info />
          ) : show === "order" ? (
            <Orders />
          ) : show === "category" ? null : (
            <p>Welcome!</p>
          )}
          <Button onClick={logOutHandler} variant="contained" color="primary">
            LogOut
          </Button>
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
    </div>
  );
}
export default UserProfile;
