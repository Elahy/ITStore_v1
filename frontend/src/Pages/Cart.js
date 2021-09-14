import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import {
  Button,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Loader from "../Components/Loader";
import { requestAddToCart, requestCart } from "../store/action/cartAction";

const useStyles = makeStyles({
  root: {
    margin: "5%",
    minHeight: "90vh",
  },
  main: {
    display: "flex",
  },
  image: {
    maxWidth: "60px",
    maxHeight: "60px",
    padding: "10px",
  },
  button: {
    maxHeight: "35px",
    padding: "8px 20px ",
    margin: "10px",
  },
  cartButton: {
    padding: "5px 7px",
    margin: "5px",
  },
  deleteButton: {
    padding: "2px",
    margin: "2px",
    display: "block",
  },
  heading: {
    textAlign: "start",
    padding: "10px",
  },
});

function Cart() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { cart } = useSelector((store) => store.cartStore);
  const { loader } = useSelector((store) => store.loaderStore);
  console.log(cart, "===cart");
  const [productList, setProductList] = useState();
  // const [totalPrice, setTotalPrice] = useState(0);

  // console.log(totalPrice, "===totalPrice");

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const deleteHandler = (productId) => {
    console.log("delete handler called");
    const item = { product: { _id: productId }, quantity: 0 };
    dispatch(requestAddToCart(item));
  };

  const minusCart = (e) => {
    const num = e.quantity;
    const item = { product: { _id: e.productId?._id }, quantity: num - 1 };
    console.log(item, "===item");
    dispatch(requestAddToCart(item));
  };
  const plusCart = (e) => {
    const num = e.quantity;
    console.log(num + 1, "===num+1");
    const item = { product: { _id: e.productId?._id }, quantity: num + 1 };
    dispatch(requestAddToCart(item));
  };

  useEffect(() => {
    dispatch(requestCart());
  }, [dispatch]);

  useEffect(() => {
    setProductList(cart);
  }, [cart]);

  const handleCheckout = () => {
    history.push("/checkout");
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : cart ? (
        <div className={classes.root}>
          <Grid container>
            <Grid xs={false} lg={2} item={true}></Grid>
            <Grid xs={12} lg={8} item={true}>
              <h1 className={classes.heading}>Shopping Cart</h1>
              <h4 className={classes.heading}>Your Order</h4>

              <div>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>{""}</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productList?.map((product) => (
                        <TableRow hover tabIndex={-1} key={product._id}>
                          <TableCell key={product._id}>
                            <Checkbox
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                          </TableCell>
                          <TableCell key={product.productId?.image}>
                            <img
                              src={`http://localhost:8080${product.productId?.image}`}
                              alt={product.productId?.title}
                              className={classes.image}
                            />
                          </TableCell>
                          <TableCell key={product.productId?.title}>
                            {product.productId?.title}
                          </TableCell>
                          <TableCell key={product.productId?.price}>
                            {product.productId?.price}tk
                          </TableCell>
                          <TableCell key={product.productId?.stock}>
                            <button
                              className={classes.cartButton}
                              onClick={() => minusCart(product)}
                            >
                              -
                            </button>
                            {product.quantity}
                            <button
                              className={classes.cartButton}
                              onClick={() => plusCart(product)}
                            >
                              +
                            </button>
                          </TableCell>
                          <TableCell key={product.quantity}>
                            {product.productId?.price *
                              parseInt(product?.quantity, 10)}
                            tk
                          </TableCell>
                          <TableCell key={product.productId._id}>
                            <button
                              onClick={() =>
                                deleteHandler(product.productId._id)
                              }
                            >
                              <img
                                src="../images/CrossDelete.svg"
                                alt="Delete icon"
                              />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableCell>
                        <p>
                          {`Total Products: ${productList?.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}`}
                        </p>
                        <p>
                          {`Total  Price: ${productList?.reduce(
                            (total, item) =>
                              total + item.productId.price * item.quantity,
                            0
                          )} TK`}
                        </p>
                      </TableCell>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
              >
                Check Out
              </Button>
            </Grid>
            <Grid xs={false} lg={2} item={true}></Grid>
          </Grid>
        </div>
      ) : (
        <p className={classes.root}>Cart is Empty!</p>
      )}
    </>
  );
}

export default Cart;
