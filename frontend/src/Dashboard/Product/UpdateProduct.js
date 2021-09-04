import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Loader from "../../Components/Loader";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  requestEditProduct,
  requestProductDetails,
} from "../../store/action/productAction";
import { setLoaderValue } from "../../store/action/loaderAction";
import FileBase64 from "react-file-base64";

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
  image: {
    marginLeft: "35%",
    maxWidth: "100px",
    maxHeight: "100px",
    padding: "0 1% ",
  },
  imageWrap: {
    display: "flex",
  },
}));

function UpdateProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const param = useParams();
  console.log(param.id, "===pro.id");
  const [image, setImage] = useState(null);
  const { currentProduct, productEdited } = useSelector(
    (store) => store.productStore
  );
  const { loaderStore } = useSelector((store) => store);
  // console.log(loaderStore.loader, "===loaderStore.loader");

  const canvas = `http://localhost:8080${currentProduct?.image}`;
  function encodeImageFileAsURL(file) {
    // var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log("RESULT", reader.result);
    };
    reader.readAsDataURL(file);
  }
  encodeImageFileAsURL(canvas);

  // const base64image = reader.result;
  // console.log(base64image, "base64Image");

  const [product, setProduct] = useState({
    _id: param.id,
    title: currentProduct?.title,
    price: currentProduct?.price,
    description: currentProduct?.description,
    // image: base64image,
    stock: currentProduct?.stock,
    category: { _id: "612c69d0307e350fc0cb6c1f" },
  });

  useEffect(() => {
    // console.log("===Console in useEffect1");
    dispatch(setLoaderValue(true));
    dispatch(requestProductDetails(param.id));
    // console.log("===Console in useEffect2");
  }, [dispatch, param.id]);

  const handleImage = (e) => {
    setImage({ files: e });
    setProduct({ ...product, image: e.base64 });
    // console.log(e.base64, "Image Event");
  };

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
  };
  if (productEdited && productEdited.status === 200) {
    history.push("/success");
  }

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
            <div className={classes.imageWrap}>
              <img
                src={`http://localhost:8080${currentProduct?.image}`}
                alt={product?.title}
                className={classes.image}
              />
              {console.log(product?.image, "===image")}
              <> Upload new image to replace this one : </>
              <FileBase64 onDone={handleImage} multiple={false} />
              {image ? (
                <pre>
                  {/*{JSON.stringify(image.files, null, 2)}*/} Image Uploaded
                </pre>
              ) : null}
            </div>
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
              <div>
                <TextField
                  id="outlined-textarea"
                  label="Category ID"
                  placeholder="Placeholder"
                  multiline
                  variant="outlined"
                  type="text"
                  name="Category"
                  defaultValue={currentProduct?.category._id}
                  onChange={handleChange}
                />
              </div>
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
