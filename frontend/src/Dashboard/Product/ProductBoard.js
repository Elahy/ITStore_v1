import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Products from "./Products";
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../store/action/userAction";
import UpdateProduct from "./UpdateProduct";

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

function ProductBoard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { view } = useSelector((store) => store.allUserStore);

  return (
    <div>
      <ul className={classes.list}>
        <li onClick={() => dispatch(setView("all"))} className={classes.select}>
          Product List
        </li>
        <li onClick={() => dispatch(setView("add"))} className={classes.select}>
          Add product
        </li>
      </ul>
      {view === "all" ? (
        <Products />
      ) : view === "add" ? (
        <AddProduct />
      ) : view === "edit" ? (
        <UpdateProduct />
      ) : (
        <p>Select</p>
      )}
    </div>
  );
}

export default ProductBoard;
