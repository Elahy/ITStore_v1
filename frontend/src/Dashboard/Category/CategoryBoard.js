import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Category from "./Category";
import AddCategory from "./AddCategory";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../store/action/userAction";
import UpdateCategory from "./UpdateCategory";

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

function CategoryBoard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { view } = useSelector((store) => store.allUserStore);

  return (
    <div>
      <ul className={classes.list}>
        <li onClick={() => dispatch(setView("all"))} className={classes.select}>
          Category List
        </li>
        <li onClick={() => dispatch(setView("add"))} className={classes.select}>
          Add Category
        </li>
      </ul>
      {view === "all" ? (
        <Category />
      ) : view === "add" ? (
        <AddCategory />
      ) : view === "edit" ? (
        <UpdateCategory />
      ) : (
        <p>Select</p>
      )}
    </div>
  );
}

export default CategoryBoard;
