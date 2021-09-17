import React from "react";
import { Dropdown, Badge } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@restart/ui/esm/Button";

const useStyles = makeStyles({
  cart: {
    position: "relative",
    margin: "0",
    marginRight: "6px",
    padding: "0",
    width: "22px",
  },
  badge: {
    backgroundColor: "red !important",
    borderRadius: "100%",
  },
  menu: {
    backgroundColor: "black",
    border: "1px solid white",
  },
  image: {
    width: "50px",
    margin: "0 10px",
  },
  cartitem: {
    display: "flex",
  },
  cartItemDetail: {
    margin: "12px 5px",
  },
  button: {
    border: "1px solid #04b4c4",
    borderRadius: "10px",
    backgroundColor: "#04b4c4",
    color: "white",
    padding: "4px 0",
    "&:hover": {
      backgroundColor: "white",
      color: "#04b4c4",
    },
  },
});

function CartLogo() {
  const classes = useStyles();
  const { cart } = useSelector((store) => store.cartStore);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" className={classes.menu}>
        <img className={classes.cart} src="./images/cart.svg" alt="cart" />

        <Badge className={classes.badge}>
          {cart?.reduce((total, item) => total + item.quantity, 0)}
        </Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: 370 }}>
        {cart?.length > 0 ? (
          <>
            {cart.map((prod) => (
              <span className={classes.cartitem} key={prod.id}>
                {console.log(prod, "===prod")}
                <img
                  src={`http://localhost:8080${prod.productId?.image}`}
                  className={classes.image}
                  alt={prod.name}
                />
                <div className={classes.cartItemDetail}>
                  <span>{prod.productId?.title} </span>
                  <span> ( {prod.productId?.price} tk) </span>
                  <span> x {prod?.quantity}</span>
                </div>
              </span>
            ))}
            <Link to="/cart">
              <Button
                style={{ width: "40%", margin: "0 100px" }}
                className={classes.button}
              >
                Go To Cart
              </Button>
            </Link>
          </>
        ) : (
          <span style={{ padding: 10 }}>Cart is Empty!</span>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CartLogo;
