import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setLoaderValue } from "../store/action/loaderAction";
import Loader from "../Components/Loader";
// import { useHistory } from "react-router";
import {
  requestOrderList,
  requestUpdateOrder,
} from "../store/action/orderAction";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    // minHeight: "70vh",
  },
  image: {
    maxWidth: "60px",
    maxHeight: "60px",
    padding: "0 1% ",
  },
  button: {
    maxHeight: "35px",
    padding: "8px 20px ",
    margin: "0 1%",
  },
});

function Order() {
  // const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orderStore, loaderStore } = useSelector((store) => store);
  const [orderList, setOrderList] = useState();
  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestOrderList());
  }, [dispatch]);

  useEffect(() => {
    setOrderList(orderStore.orderList);
  }, [orderStore]);

  const confirmHandler = (e) => {
    console.log(e, "==update Event");
    const order = {
      _id: e._id,
      status: "1",
    };
    dispatch(setLoaderValue(true));
    dispatch(requestUpdateOrder(order));
  };

  const cancelHandler = (e) => {
    const order = {
      _id: e._id,
      status: "2",
    };
    dispatch(setLoaderValue(true));
    dispatch(requestUpdateOrder(order));
  };

  const pendingHandler = (e) => {
    const order = {
      _id: e._id,
      status: "0",
    };
    dispatch(setLoaderValue(true));
    dispatch(requestUpdateOrder(order));
  };

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList?.map((product) => (
                  <TableRow hover tabIndex={-1} key={product._id}>
                    <TableCell key={product.productId?.image}>
                      {product._id}
                    </TableCell>
                    <TableCell key={product.productId?.title}>
                      {product.date}
                    </TableCell>
                    <TableCell key={product.productId?.price}>
                      {product.products.length}
                    </TableCell>
                    <TableCell key={product.quantity}>
                      <p className={classes.button}>
                        {product.status === 0 ? (
                          <>Pending</>
                        ) : product.status === 1 ? (
                          <>Deliverd</>
                        ) : (
                          <>Canceled</>
                        )}
                      </p>
                    </TableCell>
                    <TableCell>
                      {product.status === 0 ? (
                        <>
                          <button
                            className={classes.button}
                            onClick={() => confirmHandler(product)}
                          >
                            Confirm
                          </button>
                          <button
                            className={classes.button}
                            onClick={() => cancelHandler(product)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : product.status === 1 ? (
                        <>
                          <button
                            className={classes.button}
                            onClick={() => pendingHandler(product)}
                          >
                            Pending
                          </button>
                          <button
                            className={classes.button}
                            onClick={() => cancelHandler(product)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={classes.button}
                            onClick={() => pendingHandler(product)}
                          >
                            Pending
                          </button>
                          <button
                            className={classes.button}
                            onClick={() => cancelHandler(product)}
                          >
                            Confirm
                          </button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}

export default Order;
