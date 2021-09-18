import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ProductBoard from "./Product/ProductBoard";
import { makeStyles } from "@material-ui/core/styles";
import UserBoard from "./User/UserBoard";
import CategoryBoard from "./Category/CategoryBoard";
import Order from "./Order";
import PendingCarts from "./PendingCarts";

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
  },
  menu: {
    textAlign: "center",
    fontSize: "25px",
  },
  menuItem: {
    display: "flex",
    textDecoration: "none",
    margin: "8px 50px",
    padding: "5px",
    maxWidth: "100%",
    border: "1px solid #ADD8E6",
    borderRadius: "5px",
    background: "#ADD8E6",
    "&:hover": {
      cursor: "pointer",
      // padding: "7px 5px",
      background: "#d1bcbc",
    },
  },
  logoutButton: {
    margin: "30px",
  },
  icon: {
    maxWidth: "30px",
    margin: "0 5px",
  },
});
function Dashboard() {
  const classes = useStyles();
  const [show, setShow] = useState("user");

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Dashboard</h1>
      <Grid container>
        <Grid item lg={2}></Grid>
        <Grid item lg={3} className={classes.menuGrid}>
          <p className={classes.menu}>Menu</p>
          <ul>
            <li onClick={() => setShow("user")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/user_icon.svg"
                alt="userIcon"
              />
              User
            </li>
            <li onClick={() => setShow("product")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/product.svg"
                alt="userIcon"
              />
              Product
            </li>
            <li onClick={() => setShow("order")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/orderlist.svg"
                alt="userIcon"
              />
              Orders
            </li>
            <li
              onClick={() => setShow("category")}
              className={classes.menuItem}
            >
              <img
                className={classes.icon}
                src="./images/category_icon.svg"
                alt="userIcon"
              />
              Category
            </li>
            <li onClick={() => setShow("carts")} className={classes.menuItem}>
              <img
                className={classes.icon}
                src="./images/blackCart.svg"
                alt="userIcon"
              />
              Pending Carts
            </li>
          </ul>
        </Grid>

        <Grid item lg={5} className={classes.itemGrid}>
          {show === "product" ? (
            <ProductBoard />
          ) : show === "user" ? (
            <UserBoard />
          ) : show === "order" ? (
            <Order />
          ) : show === "category" ? (
            <CategoryBoard />
          ) : show === "carts" ? (
            <PendingCarts />
          ) : (
            <p>Welcome!</p>
          )}
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
