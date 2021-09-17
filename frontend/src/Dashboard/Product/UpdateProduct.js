import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Loader from "../../Components/Miscellaneous/Loader";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  requestEditProduct,
  requestProductDetails,
} from "../../store/action/productAction";
import { setLoaderValue } from "../../store/action/loaderAction";
import { MenuItem } from "@material-ui/core";
import { requestCategoryList } from "../../store/action/categoryAction";

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

function UpdateProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentProduct } = useSelector((store) => store.productStore);
  console.log(currentProduct, "====currentProduct");
  const { categoryList } = useSelector((store) => store.categoryStore);
  const { loaderStore } = useSelector((store) => store);

  const [product, setProduct] = useState();

  useEffect(() => {
    setProduct({
      _id: currentProduct?._id,
      title: currentProduct?.title,
      price: currentProduct?.price,
      description: currentProduct?.description,
      stock: currentProduct?.stock,
      category: currentProduct?.category._id,
    });
  }, [currentProduct]);

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestProductDetails());
    dispatch(requestCategoryList());
  }, [dispatch]);

  // console.log(product, "===product");

  const handleChange = (event) => {
    const value = event.target.value;
    setProduct({
      ...product,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    dispatch(setLoaderValue(true));
    dispatch(requestEditProduct(product));
    history.push("/");
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
            Edit Product info
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Title"
                placeholder="Placeholder"
                multiline
                maxRows={4}
                variant="outlined"
                type="text"
                name="title"
                defaultValue={currentProduct?.title}
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
                defaultValue={currentProduct?.price}
                onChange={handleChange}
              />
              <div />
              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={8}
                  variant="outlined"
                  type="text"
                  name="description"
                  defaultValue={currentProduct?.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextField
                  id="outlined-textarea"
                  label="Stock"
                  placeholder="Placeholder"
                  multiline
                  variant="outlined"
                  type="text"
                  name="stock"
                  defaultValue={currentProduct?.stock}
                  onChange={handleChange}
                />
              </div>
              <TextField
                id="filled-select-categoty"
                select
                label="Category"
                defaultValue={currentProduct?.category?.name}
                name="category"
                onChange={handleChange}
                helperText="Please select a category"
                variant="outlined"
              >
                {console.log(
                  currentProduct?.category?.name,
                  "currentProduct?.category?.name"
                )}
                {categoryList.map((category) => (
                  <MenuItem
                    key={category._id}
                    value={category.name}
                    // defaultValue={currentProduct?.category.name}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
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
            onClick={handleSubmit}
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

export default UpdateProduct;
