import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setView } from "../store/action/userAction";

const useStyles = makeStyles({
  list: {
    display: "flex",
    marginTop: "30px",
  },
  select: {
    display: "flex",
    textDecoration: "none",
    padding: "8px",
    margin: "0 10px 0 300px",
    border: "1px solid black",
    borderRadius: "5px",
    // background: "#cdcdcd",
    "&:hover": {
      cursor: "pointer",
      padding: "12px 10px",
      background: "#d1bcbc",
    },
  },
  addIcon: {
    width: "25px",
    cursor: "pointer",
    padding: "0 ",
    marginRight: "5px",
  },
});

function DashNav({ keyword }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { view } = useSelector((store) => store.allUserStore);

  return (
    <div className={classes.list}>
      <p onClick={() => dispatch(setView("all"))}> DashBoard </p> {" > "}
      <p onClick={() => dispatch(setView("all"))}>{`${keyword} List`}</p>
      {view === "add" ? (
        <>
          {" > "}
          <p> {`Add ${keyword}`}</p>
        </>
      ) : view === "edit" ? (
        <>
          {" > "}
          <p>{`Edit ${keyword} Info`}</p>
        </>
      ) : null}
      {view !== "add" ? (
        <p onClick={() => dispatch(setView("add"))} className={classes.select}>
          <img className={classes.addIcon} src="./images/add.svg" alt="add" />
          {`Add ${keyword}`}
        </p>
      ) : null}
    </div>
  );
}

export default DashNav;
