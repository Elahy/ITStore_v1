import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import {
  Button,
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
import { setLoaderValue } from "../store/action/loaderAction";
import {
  addToCart,
  requestAddToCart,
  requestCart,
  requestCheckout,
} from "../store/action/cartAction";

const useStyles = makeStyles({
  root: {
    margin: "5%",
    minHeight: "90vh",
  },
});

function CheckOutPage() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { checkoutItems } = useSelector((store) => store.cartStore);
  const { loader } = useSelector((store) => store.loaderStore);
  console.log(checkoutItems, "===cart");
  const [productList, setProductList] = useState();

  useEffect(() => {
    setProductList(checkoutItems);
  }, [checkoutItems]);

  const handleCheckout = () => {
    dispatch(setLoaderValue(true));
    dispatch(requestCheckout());
    dispatch(addToCart(""));
    history.push("/");
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={classes.root}>
          {" "}
          <Button onClick={handleCheckout} variant="contained" color="primary">
            Place Order
          </Button>
        </div>
      )}
    </>
  );
}

export default CheckOutPage;
