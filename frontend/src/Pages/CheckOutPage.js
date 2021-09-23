import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import Loader from "../Components/Miscellaneous/Loader";
import { setLoaderValue } from "../store/action/loaderAction";
import { addToCart, requestCheckout } from "../store/action/cartAction";
import { requestMyInfo } from "../store/action/userAction";

const useStyles = makeStyles({
  main: {
    minHeight: "90vh",
    backgroundImage:
      "linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%)",
  },
  address: {
    padding: "25px",
    maxWidth: "500px",
    margin: "10px 10px",
  },
  root: {
    display: "flex",
    maxWidth: "500px",
    margin: "10px 20px 10px 100px",
  },
  productIcon: {
    width: "151px",
    margin: "20px 20px",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
});

function CheckOutPage() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cartStore);
  const { userInfo } = useSelector((store) => store.myInfoStore);
  const { loader } = useSelector((store) => store.loaderStore);
  const [productList, setProductList] = useState();

  useEffect(() => {
    dispatch(requestMyInfo());
    setProductList(cart);
  }, [dispatch, cart]);

  const handleCheckout = () => {
    dispatch(setLoaderValue(true));
    dispatch(requestCheckout());
    dispatch(addToCart(""));
    history.push("/success");
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={classes.main}>
          <h1 className={classes.header}>Review Address and Payment Method</h1>

          <Grid container>
            <Grid xs={false} lg={2} item={true}></Grid>

            <Grid xs={12} lg={4} item={true}>
              {productList?.map((product) => (
                <div key={product.productId?._id}>
                  <Card className={classes.root}>
                    <CardMedia
                      className={classes.productIcon}
                      image={`http://fake-comb.herokuapp.com${product.productId?.image}`}
                      title="Live from space album cover"
                    />
                    <div className={classes.details}>
                      <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                          {product.productId?.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Unit price: {product.productId?.price}Tk
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Quantiy: {product.quantity}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Price: {product.productId?.price * product.quantity}Tk
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </Grid>
            <Grid xs={12} lg={4} item={true}>
              <Card className={classes.address}>
                <CardContent>
                  <p>First Name: {userInfo.firstname}</p>
                  <p>Last Name: {userInfo.lastname}</p>
                  <p>Email: {userInfo.email}</p>
                  <p>Shipping Address</p>
                  <p>City: {userInfo.address?.city}</p>
                  <p>Phone: {userInfo.phone}</p>
                </CardContent>
              </Card>
              <Card className={classes.address}>
                <CardContent>
                  <h5>{`Total  Price: ${productList?.reduce(
                    (total, item) =>
                      total + item.productId.price * item.quantity,
                    0
                  )} TK`}</h5>
                  <h5>
                    {`Total Products: ${productList?.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}`}
                  </h5>
                  <div>
                    <h4>Select Payment Method</h4>
                    <select name="cars" id="cars">
                      <option value="bkash">Bkash</option>
                      <option value="card">Credit Card</option>
                      <option value="COD">Cash On Deliery</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
              <Button
                onClick={handleCheckout}
                variant="contained"
                color="primary"
              >
                Place Order
              </Button>
            </Grid>
            <Grid xs={false} lg={4} item={true}></Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default CheckOutPage;
