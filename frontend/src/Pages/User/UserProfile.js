import { Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signIn } from "../../store/action/signInAction";
import Info from "./Info";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Orders from "./Orders";
import { addToCart } from "../../store/action/cartAction";

const useStyles = makeStyles({
  root: {
    margin: "0",
    minHeight: "90vh",
    background: "#e8f4f8",
  },
  menuGrid: {
    background: "#ADD8E6",
    borderRadius: "20px 0 0  20px",
    minHeight: "70vh",
  },
  itemGrid: {
    background: "#ADD8E6",
    borderRadius: "0 20px 20px 0",
    minHeight: "70vh",
  },
  header: {
    textAlign: "center",
    margin: "0",
    padding: "20px",
    fontFamily: "Helvetica Neue",
  },
  menu: {
    textAlign: "center",
    fontSize: "25px",
    fontFamily: "Helvetica Neue",
    marginTop: "40px",
  },
  menuItem: {
    display: "flex",
    textDecoration: "none",
    margin: "10px 50px",
    padding: "5px",
    maxWidth: "100%",
    border: "1px solid #ADD8E6",
    borderRadius: "5px",
    background: "#ADD8E6",
    "&:hover": {
      cursor: "pointer",
      padding: "7px 5px",
      background: "#d1bcbc",
    },
  },
  logout: {
    display: "flex",
    margin: "5px 130px",
    padding: "5px",
    maxWidth: "100%",
    background: "#ADD8E6",
  },
  logoutButton: {
    margin: "64px 0",
    backgroundColor: "gray",
  },
  icon: {
    maxWidth: "30px",
    margin: "0 5px",
  },
});

function UserProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    setShow("info");
  }, []);

  const logOutHandler = () => {
    dispatch(signIn(""));
    dispatch(addToCart([null]));
    history.push("/");
  };
  const [show, setShow] = useState(null);

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Profile</h1>
      <Grid container>
        <Grid item lg={2}></Grid>
        <Grid item lg={3} className={classes.menuGrid}>
          <p className={classes.menu}>Menu</p>
          <ul>
            <li onClick={() => setShow("info")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/user_icon.svg"
                alt="userIcon"
              />
              Profile
            </li>
            <li onClick={() => setShow("order")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/orderlist.svg"
                alt="userIcon"
              />
              Active Orders
            </li>
            <li onClick={() => setShow("order")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/done.svg"
                alt="userIcon"
              />
              Past Orders
            </li>
            <li onClick={() => setShow("order")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/reviews.svg"
                alt="userIcon"
              />
              Reviews
            </li>
            <li onClick={() => setShow("order")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/trackOder.png"
                alt="userIcon"
              />
              Track Orders
            </li>
            <li onClick={() => setShow("order")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/customerService.svg"
                alt="userIcon"
              />
              Customer Service
            </li>
            <li className={classes.logout}>
              <Button
                onClick={logOutHandler}
                className={classes.logoutButton}
                variant="contained"
                color="primary"
              >
                LogOut
              </Button>
            </li>
          </ul>
        </Grid>
        {/* <Grid item lg={1} className={classes.menuGrid}></Grid> */}
        <Grid item lg={5} className={classes.itemGrid}>
          {show === "info" ? (
            <Info />
          ) : show === "order" ? (
            <Orders />
          ) : (
            <p>Welcome!</p>
          )}
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
    </div>
  );
}
export default UserProfile;
