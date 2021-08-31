import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { requestProductList } from "../store/action/productAction";
import { setLoaderValue } from "../store/action/loaderAction";
import Loader from "../Components/Loader";

const useStyles = makeStyles({
  root: {
    display: "flex",
    // minHeight: "70vh",
  },
  image: {
    maxWidth: "60px",
    maxHeight: "60px",
    padding: "0 1% ",
  },
  button: {
    maxHeight: "35px",
    padding: "8px 20px ",
    margin: "0 1%",
  },
});

function Products() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productStore, loaderStore } = useSelector((store) => store);
  const productList = productStore.productList;
  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestProductList());
  }, [dispatch]);

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div>
          {productList.map((product) => (
            <div key={product._id} className={classes.root}>
              <img
                src={`http://localhost:8080${product.image}`}
                alt={product.title}
                className={classes.image}
              />
              {console.log(product.image, "===image")}
              <p className={classes.button}>{product.title}</p>
              {product.stock ? (
                <p className={classes.button}>
                  {product.stock} pieces available
                </p>
              ) : (
                <p className={classes.button}>Out of Stock</p>
              )}
              <button className={classes.button}>Edit</button>
              <button className={classes.button}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Products;
