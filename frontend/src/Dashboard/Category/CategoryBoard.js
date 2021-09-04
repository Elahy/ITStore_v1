import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Category from "./Category";

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
  const [view, setView] = useState("all");

  return (
    <div>
      <ul className={classes.list}>
        <li onClick={() => setView("all")} className={classes.select}>
          Category List
        </li>
        <li onClick={() => setView("add")} className={classes.select}>
          Add Category
        </li>
      </ul>
      {view === "all" ? <Category /> : view === "add" ? null : <p>Select</p>}
    </div>
  );
}

export default CategoryBoard;
