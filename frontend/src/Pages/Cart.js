import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

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

  const { cart } = useSelector((store) => store.cartStore);
  console.log(cart, "===cart");
  const productList = cart;

  const deleteHandler = (e) => {
    history.push(`/delete/${e.data.id}`);
  };

  return (
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
    </div>
  );
}

export default Cart;
