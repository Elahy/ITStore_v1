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
  },
  cartitem: {
    display: "flex",
  },
});

function CartLogo() {
  const classes = useStyles();
  // const dispatch = useDispatch();
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
                <div className="cartItemDetail">
                  <span>{prod.productId?.title}</span>
                  <span> {prod.productId?.price} tk</span>
                </div>
                {/* <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      /> */}
              </span>
            ))}
            <Link to="/cart">
              <Button style={{ width: "95%", margin: "0 10px" }}>
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
