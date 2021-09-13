import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  requestDeleteProduct,
  requestProductDetails,
  requestProductList,
} from "../../store/action/productAction";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { setLoaderValue } from "../../store/action/loaderAction";
import Loader from "../../Components/Loader";
import { useHistory } from "react-router";
import { setView } from "../../store/action/userAction";

// import DeleteIcon from "@material-ui/icons/Delete";

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
    padding: "6px 20px ",
    margin: "8% 2%",
  },
  buttons: {
    display: "flex",
  },
});

function Products() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productStore, loaderStore } = useSelector((store) => store);
  const productList = productStore.productList;

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestProductList());
  }, [dispatch]);

  const updateHandler = (e) => {
    console.log(e, "==update Event");
    dispatch(requestProductDetails(e._id));
    dispatch(setView("edit"));
  };

  const deleteHandler = (e) => {
    dispatch(requestDeleteProduct(e._id));
    history.push("/success");
  };

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div>
          <div>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>{""}</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList?.map((product) => (
                    <TableRow hover tabIndex={-1} key={product._id}>
                      <TableCell key={product?.image}>
                        <img
                          src={`http://localhost:8080${product?.image}`}
                          alt={product?.title}
                          className={classes.image}
                        />
                      </TableCell>
                      <TableCell key={product?.title}>
                        {product?.title}
                      </TableCell>

                      <TableCell key={product.quantity}>
                        {product.stock ? (
                          <p className={classes.button}>
                            {product.stock} pieces available
                          </p>
                        ) : (
                          <p className={classes.button}>Out of Stock</p>
                        )}
                      </TableCell>

                      <TableCell className={classes.buttons}>
                        <button
                          className={classes.button}
                          onClick={() => updateHandler(product)}
                        >
                          Edit
                        </button>

                        <button
                          className={classes.button}
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
