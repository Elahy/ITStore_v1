import React, { useEffect } from "react";
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
  const productList = orderStore.orderList;
  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestOrderList());
  }, [dispatch]);
  const confirmHandler = (e) => {
    console.log(e, "==update Event");
    const order = {
      _id: e._id,
      status: "1",
    };
    dispatch(requestUpdateOrder(order));
  };
  const cancelHandler = (e) => {
    const order = {
      _id: e._id,
      status: "2",
    };
    dispatch(requestUpdateOrder(order));
  };
  const pendingHandler = (e) => {
    const order = {
      _id: e._id,
      status: "0",
    };
    dispatch(requestUpdateOrder(order));
  };

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div>
          {productList.map((product) => (
            <div key={product._id} className={classes.root}>
              {console.log(product, "===image")}

              <p className={classes.button}>{product._id}</p>
              <p className={classes.button}>{product.date}</p>
              <p className={classes.button}>{product.userId?.username}</p>

              <p className={classes.button}>
                {product.status === 0 ? (
                  <>Pending</>
                ) : product.status === 1 ? (
                  <>Deliverd</>
                ) : (
                  <>Canceled</>
                )}
              </p>
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
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Order;
