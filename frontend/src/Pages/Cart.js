import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import Loader from "../Components/Loader";
import { setLoaderValue } from "../store/action/loaderAction";
import { addToCart, requestCheckout } from "../store/action/cartAction";

const useStyles = makeStyles({
  root: {
    marginTop: "5%",
    marginLeft: "25%",
    minHeight: "90vh",
  },
  main: {
    display: "flex",
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

function Cart() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { cart } = useSelector((store) => store.cartStore);
  const { loader } = useSelector((store) => store.loaderStore);
  console.log(cart, "===cart");
  const productList = cart;

  const deleteHandler = (e) => {
    history.push(`/delete/${e.data.id}`);
  };

  const handleCheckout = () => {
    dispatch(setLoaderValue(true));
    dispatch(requestCheckout());
    dispatch(addToCart(""));
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : cart ? (
        <div className={classes.root}>
          {productList.map((product) => (
            <div key={product.productId._id} className={classes.main}>
              <img
                src={`http://localhost:8080${product.productId.image}`}
                alt={product.productId.title}
                className={classes.image}
              />
              {console.log(product.productId, "===product from image")}
              <p className={classes.button}>{product.productId.title}</p>
              <p className={classes.button}>- {product.quantity} +</p>

              <button className={classes.button} onClick={deleteHandler}>
                Delete
              </button>
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Place Order
          </Button>
        </div>
      ) : (
        <p className={classes.root}>Cart is Empty!</p>
      )}
    </>
  );
}

export default Cart;
