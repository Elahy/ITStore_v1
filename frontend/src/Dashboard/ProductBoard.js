import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Products from "./Products";
import AddProduct from "./AddProduct";

const useStyles = makeStyles({
  list: {
    display: "flex",
  },
  select: {
    display: "flex",
    textDecoration: "none",
    padding: "1%",
    margin: "1%",
    border: "1px solid black",
    borderRadius: "5px",
    background: "#cdcdcd",
  },
});

function ProductBoard() {
  const classes = useStyles();
  const [view, setView] = useState("all");

  return (
    <div>
      <ul className={classes.list}>
        <li onClick={() => setView("all")} className={classes.select}>
          Product List
        </li>
        <li onClick={() => setView("add")} className={classes.select}>
          Add product
        </li>
      </ul>
      {view === "all" ? (
        <Products />
      ) : view === "add" ? (
        <AddProduct />
      ) : (
        <p>Select</p>
      )}
    </div>
  );
}

export default ProductBoard;
