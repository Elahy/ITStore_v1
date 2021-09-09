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
import DeleteIcon from "@material-ui/icons/Delete";
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

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const deleteHandler = (e) => {
    const item = { product: { _id: e }, quantity: 0 };
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
                          <TableCell>
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
                          <TableCell key={product.quantity}>
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
                          <TableCell>
                            {product.productId?.price *
                              parseInt(product?.quantity, 10)}{" "}
                            tk
                          </TableCell>
                          <TableCell onClick={deleteHandler}>
                            <DeleteIcon className={classes.deleteButton} />
                            {console.log("Delete Icon Called")}
                          </TableCell>
                        </TableRow>
                      ))}
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
