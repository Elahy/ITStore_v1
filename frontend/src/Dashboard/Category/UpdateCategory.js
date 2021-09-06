import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Loader from "../../Components/Loader";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderValue } from "../../store/action/loaderAction";
import { requestEditCategory } from "../../store/action/categoryAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "44%",
      textAlign: "center",
      marginLeft: "28%",
      marginRight: "28%",
    },
  },
  input: {
    margin: theme.spacing(1),
    marginLeft: "40%",
    backgroundColor: "#04b4c4",
  },
  input2: {
    margin: theme.spacing(1),
    marginLeft: 15,
  },
  head: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: "45%",
  },
}));

function UpdateCategory(userId) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentCategory } = useSelector((store) => store.categoryStore);
  console.log(currentCategory, "===currentUser");
  const { loaderStore } = useSelector((store) => store);
  // console.log(loaderStore.loader, "===loaderStore.loader");

  const [category, setCategory] = useState({
    _id: currentCategory?._id,
    name: currentCategory?.name,
    description: currentCategory?.description,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setCategory({
      ...category,
      [event.target.name]: value,
    });
  };
  const handleCancel = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    dispatch(setLoaderValue(true));
    dispatch(requestEditCategory(category));
  };

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div>
          <Typography
            variant="h3"
            align="center"
            className={classes.head}
            gutterBottom
          >
            Edit Category info
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Name"
                multiline
                maxRows={4}
                variant="outlined"
                type="text"
                name="name"
                defaultValue={currentCategory?.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Description"
                multiline
                variant="outlined"
                type="text"
                name="description"
                defaultValue={currentCategory?.description}
                onChange={handleChange}
              />
              <div />
            </div>
          </form>
          <Button
            onClick={handleSubmit}
            className={classes.input}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            onClick={handleCancel}
            className={classes.input2}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}

export default UpdateCategory;
