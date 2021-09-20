import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../Components/Miscellaneous/Loader";
import { useHistory } from "react-router";
import { requestAddProduct } from "../../store/action/productAction";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { setLoaderValue } from "../../store/action/loaderAction";
import { requestCategoryList } from "../../store/action/categoryAction";
import { MenuItem } from "@material-ui/core";
import { setView } from "../../store/action/userAction";

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
    fontSize: "25px",
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
    marginLeft: "80px",
  },
  image: {
    marginLeft: "10%",
  },
}));

function AddProduct() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loader } = useSelector((store) => store.loaderStore);
  const { categoryList } = useSelector((store) => store.categoryStore);
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState({
    title: "",
    price: null,
    description: "",
    image: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestCategoryList());
  }, [dispatch]);

  const handleChange = (event) => {
    const value = event.target.value;
    setProduct({
      ...product,
      [event.target.name]: value,
    });
  };

  const handleImage = (e) => {
    setImage({ files: e });
    setProduct({ ...product, image: e.base64 });
  };

  const handleSubmit = (e) => {
    dispatch(requestAddProduct(product));
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
            Add Product Details
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Title"
                multiline
                maxRows={4}
                variant="outlined"
                type="text"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Price"
                placeholder="Placeholder"
                multiline
                variant="outlined"
                type="text"
                name="price"
                onChange={handleChange}
              />
              <div />
              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={5}
                  variant="outlined"
                  type="text"
                  name="description"
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextField
                  id="filled-select-categoty"
                  select
                  label="Category"
                  // value={category}
                  name="category"
                  onChange={handleChange}
                  helperText="Please select a category"
                  variant="outlined"
                >
                  {categoryList.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Stock"
                  variant="outlined"
                  type="text"
                  name="stock"
                  onChange={handleChange}
                />
              </div>
              <div className={classes.imageWrap}>
                <FileBase64 onDone={handleImage} multiple={false} />
                {image ? <pre>Image Uploaded</pre> : null}
              </div>
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
              onClick={() => dispatch(setView("all"))}
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

export default AddProduct;
