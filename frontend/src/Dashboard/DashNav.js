import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setView } from "../store/action/userAction";

const useStyles = makeStyles({
  list: {
    // padding: "5px 10px",
    display: "flex",
    marginTop: "25px",
    fontSize: "17px",
    fontFamily: "sans-serif",
  },
  link: {
    padding: "7px 10px 7px 0",
    marginBottom: "0",
    "&:hover": {
      cursor: "pointer",
      background: "#91B2C7",
      borderRadius: "5px",
    },
  },
  select: {
    display: "flex",
    textDecoration: "none",
    padding: "5px 8px",
    margin: "0 10px 0 300px",
    border: "1px solid black",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      padding: "5px 10px",
      margin: "0 10px 0 298px",
      background: "#91B2C7",
    },
  },
  addIcon: {
    height: "25px",
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
      <p onClick={() => dispatch(setView("all"))} className={classes.link}>
        DashBoard
      </p>

      <p onClick={() => dispatch(setView("all"))} className={classes.link}>
        {" > "}
        {`${keyword} List`}
      </p>
      {view === "add" ? (
        <>
          <p className={classes.link}>
            {" > "}
            {`Add ${keyword}`}
          </p>
        </>
      ) : view === "edit" ? (
        <>
          <p className={classes.link}>
            {" > "}
            {`Edit ${keyword} Info`}
          </p>
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
