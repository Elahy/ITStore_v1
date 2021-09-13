import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ProductBoard from "./Product/ProductBoard";
import { makeStyles } from "@material-ui/core/styles";
import UserBoard from "./User/UserBoard";
import CategoryBoard from "./Category/CategoryBoard";
import Order from "./Order";

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
  logoutButton: {
    margin: "30px",
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
              User
            </li>
            <li onClick={() => setShow("product")} className={classes.menuItem}>
              Product
            </li>
            <li onClick={() => setShow("order")} className={classes.menuItem}>
              Orders
            </li>
            <li
              onClick={() => setShow("category")}
              className={classes.menuItem}
            >
              Category
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
