import React, { useEffect, useState } from "react";
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
import Pagination from "../../Components/Pagination";

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
  EditIcon: {
    width: "25px",
    cursor: "pointer",
    padding: "0 ",
    margin: "17px 10px",
  },
  DeleteIcon: {
    width: "25px",
    cursor: "pointer",
    padding: "0 ",
    margin: "0 10px",
  },
});

function Products() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage /*setPostPerPage */] = useState(5);

  const { productStore, loaderStore } = useSelector((store) => store);
  // const productList = productStore.productList;

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestProductList());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProductList = productStore.productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                    <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                      {""}
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                      Product
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                      Stock
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentProductList?.map((product) => (
                    <TableRow hover tabIndex={-1} key={product._id}>
                      <TableCell key={product?.image}>
                        <img
                          src={`http://localhost:8080${product?.image}`}
                          alt={product?.title}
                          className={classes.image}
                        />
                      </TableCell>
                      <TableCell
                        key={product?.title}
                        style={{ maxWidth: "200px" }}
                      >
                        {product?.title}
                      </TableCell>

                      <TableCell key={product.quantity}>
                        {product.stock ? (
                          <p className={classes.button}>{product.stock}</p>
                        ) : (
                          <p className={classes.button}>Out of Stock</p>
                        )}
                      </TableCell>

                      <TableCell className={classes.buttons}>
                        <img
                          onClick={() => updateHandler(product)}
                          src="../images/EditIcon.svg"
                          alt="Edit icon"
                          className={classes.EditIcon}
                        />

                        <img
                          onClick={() => deleteHandler(product)}
                          src="../images/CrossDelete.svg"
                          alt="Delete icon"
                          className={classes.DeleteIcon}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              productPerPage={productPerPage}
              totalProducts={productStore.productList.length}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
