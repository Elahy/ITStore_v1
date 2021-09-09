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
          {productList.map((product) => (
            <div key={product._id} className={classes.root}>
              <p className={classes.button}>{product._id}</p>
              <p className={classes.button}>{product.date}</p>
              <p className={classes.button}>{product.products.length}</p>
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

export default Orders;
