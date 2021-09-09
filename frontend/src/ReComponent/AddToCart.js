import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const classes = useStyles();
  const { role } = useSelector((store) => store.userInfoStore);
  const handleCartAdd = () => {
    const item = { ...product, quantity: 1 };
    role ? dispatch(requestAddToCart(item)) : history.push("/signin");
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
