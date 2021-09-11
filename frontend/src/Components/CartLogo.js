import React from "react";
import { Dropdown, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  cart: {
    position: "relative",
    margin: "0",
    padding: "0",
    width: "25px",
  },
});

function CartLogo() {
  const classes = useStyles();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success">
        {/* <img className={classes.cart} src="./images/cart.svg" alt="cart" /> */}
        <FaShoppingCart
          className={classes.cart}
          color="white"
          fontSize="25px"
          marginTop="0px"
        />
        <Badge>{10}</Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: 370 }}>
        <span style={{ padding: 10 }}>Cart is Empty!</span>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CartLogo;
