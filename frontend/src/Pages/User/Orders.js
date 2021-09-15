import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setLoaderValue } from "../../store/action/loaderAction";
import Loader from "../../Components/Loader";
import {
  requestMyOrder,
  requestUpdateOrder,
} from "../../store/action/orderAction";
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
    maxWidth: "100px",
    padding: "7px 20px ",
    margin: "2px 10px",
    border: "1px solid black",
    borderRadius: "10px",
  },
  confirmButton: {
    maxHeight: "35px",
    maxWidth: "100px",
    padding: "7px 20px ",
    margin: "2px 10px",
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "#98FB98",
  },
  cancelButton: {
    maxHeight: "35px",
    maxWidth: "100px",
    padding: "7px 20px ",
    margin: "2px 10px",
    border: "1px solid black",
    borderRadius: "10px",
    background: "#FFB6C1",
  },
  pendingButton: {
    maxHeight: "35px",
    maxWidth: "100px",
    padding: "7px 20px ",
    margin: "2px 10px",
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "#FFFACD",
  },
  buttons: {
    display: "flex",
  },
});

function Orders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { myInfoStore, loaderStore } = useSelector((store) => store);
  const productList = myInfoStore.myOrder;
  console.log(productList, "===orderlist");
  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestMyOrder());
  }, [dispatch]);
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
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Order ID
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Order Date
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Item
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Status
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList?.map((product) => (
                  <TableRow hover tabIndex={-1} key={product._id}>
                    <TableCell key={product.productId?.image}>
                      {product._id.slice(12, 24)}
                    </TableCell>
                    <TableCell key={product.productId?.title}>
                      {product.date.slice(0, 10)}
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
                    <TableCell className={classes.buttons}>
                      {product.status === 0 ? (
                        <>
                          <button
                            className={classes.confirmButton}
                            onClick={() => confirmHandler(product)}
                          >
                            Confirm
                          </button>
                          <button
                            className={classes.cancelButton}
                            onClick={() => cancelHandler(product)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : product.status === 1 ? (
                        <>
                          <button
                            className={classes.pendingButton}
                            onClick={() => pendingHandler(product)}
                          >
                            Pending
                          </button>
                          <button
                            className={classes.cancelButton}
                            onClick={() => cancelHandler(product)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={classes.pendingButton}
                            onClick={() => pendingHandler(product)}
                          >
                            Pending
                          </button>
                          <button
                            className={classes.confirmButton}
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

export default Orders;
