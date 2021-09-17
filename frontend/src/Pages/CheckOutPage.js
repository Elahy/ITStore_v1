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
// import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "../Components/Miscellaneous/Loader";
import { setLoaderValue } from "../store/action/loaderAction";
import { addToCart, requestCheckout } from "../store/action/cartAction";
import { requestMyInfo } from "../store/action/userAction";

const useStyles = makeStyles({
  main: {
    margin: "5%",
    minHeight: "90vh",
  },
  address: {
    border: "1px solid black",
    padding: "25px",
    borderRadius: "20px",
    maxWidth: "400px",
    margin: "25px",
  },
  media: {
    maxWidth: "150px",
  },
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function CheckOutPage() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { cart } = useSelector((store) => store.cartStore);
  const { userInfo } = useSelector((store) => store.myInfoStore);

  const { loader } = useSelector((store) => store.loaderStore);
  console.log(cart, "===checkoutItems");
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
          <h1>Review Address and Payment Method</h1>
          <Grid xs={false} lg={1} item={true}></Grid>
          <Grid container>
            <Grid xs={12} lg={5} item={true}>
              <div className={classes.address}>
                <p>First Name: {userInfo.firstname}</p>
                <p>Last Name: {userInfo.lastname}</p>
                <p>Email: {userInfo.email}</p>
                <p>Shipping Address</p>
                <p>City: {userInfo.address?.city}</p>
                <p>Phone: {userInfo.phone}</p>
              </div>
              <div>
                <h4>Select Payment Method</h4>
                <p1>Bkash</p1>
                <br />
                <p1>Card</p1>
                <br />
                <p1>Cash On Deliery</p1>
              </div>
              {/* <h5>{totalPrice} Tk</h5> */}
              {/* {console.log(totalPrice, "totalPrice")} */}
              <Button
                onClick={handleCheckout}
                variant="contained"
                color="primary"
              >
                Place Order
              </Button>
            </Grid>
            <Grid xs={12} lg={5} item={true}>
              {productList?.map((product) => (
                <>
                  <Card className={classes.root}>
                    <CardMedia
                      className={classes.cover}
                      image={`http://localhost:8080${product.productId?.image}`}
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
                </>
              ))}
            </Grid>
            <Grid xs={false} lg={1} item={true}></Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default CheckOutPage;
