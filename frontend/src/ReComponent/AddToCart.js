import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { requestAddToCart } from "../store/action/cartAction";

const useStyles = makeStyles({
  button: {
    marginLeft: "15%",
    marginRight: "15%",
    color: "#04b4c4",
    borderColor: "#04b4c4",
  },
});

function AddToCart(product) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleCartAdd = () => {
    const item = { ...product, quantity: 1 };
    dispatch(requestAddToCart(item));
    console.log(product, "===Add to cart called");
  };

  return (
    <Button
      onClick={handleCartAdd}
      variant="outlined"
      color="primary"
      className={classes.button}
    >
      Add to Cart
    </Button>
  );
}

export default AddToCart;
