import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../Components/Miscellaneous/Loader";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import FileBase64 from "react-file-base64";
import { requestAddCategory } from "../../store/action/categoryAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80%",
      textAlign: "center",
      marginLeft: "10%",
    },
  },
  input1: {
    margin: theme.spacing(1),
    marginLeft: "30%",
    backgroundColor: "#04b4c4",
  },
  input2: {
    margin: theme.spacing(1),
    marginLeft: 15,
  },
  head: {
    margin: theme.spacing(1),
  },
  upload: {
    textAlign: "center",
    border: "2px solid black",
    padding: "8px 15px",
    maxWidth: "50px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  imageWrap: {
    display: "flex",
  },
  image: {
    marginLeft: "10%",
  },
}));

function AddCategory() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loader } = useSelector((store) => store.loaderStore);
  // const [image, setImage] = useState(null);

  const [category, setCategory] = useState({
    name: "",
    description: "",
    // image: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setCategory({
      ...category,
      [event.target.name]: value,
    });
  };

  // const handleImage = (e) => {
  //   setImage({ files: e });
  //   setProduct({ ...product, image: e.base64 });
  //   // console.log(e.base64, "Image Event");
  // };

  const handleSubmit = (e) => {
    console.log(category, "Image Submitted");
    dispatch(requestAddCategory(category));
    history.push("/success");
    e.preventDefault();
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <Typography
            variant="h3"
            align="center"
            className={classes.head}
            gutterBottom
          >
            Add Category Information
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Name"
                multiline
                variant="outlined"
                type="text"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Description"
                placeholder="Placeholder"
                multiline
                variant="outlined"
                type="text"
                name="description"
                onChange={handleChange}
              />
              <div />

              {/* <div className={classes.imageWrap}>
                <FileBase64 onDone={handleImage} multiple={false} />
                {image ? (
                  <pre>{JSON.stringify(image.files, null, 2)}</pre>
                ) : null}
              </div> */}
            </div>
          </form>
          <div>
            <Button
              onClick={handleSubmit}
              className={classes.input1}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
            <Button
              onClick={handleSubmit}
              className={classes.input2}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCategory;
