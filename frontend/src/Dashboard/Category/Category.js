import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setLoaderValue } from "../../store/action/loaderAction";
import Loader from "../../Components/Miscellaneous/Loader";
import { useHistory } from "react-router";
import {
  requestCategoryDetails,
  requestCategoryList,
  requestDeleteCategory,
  setCurrentCategoryId,
} from "../../store/action/categoryAction";
import { setView } from "../../store/action/userAction";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Pagination from "../../Components/Pagination";

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
  EditIcon: {
    width: "25px",
    cursor: "pointer",
    padding: "0 ",
    margin: "0 10px",
  },
  DeleteIcon: {
    width: "25px",
    cursor: "pointer",
    padding: "0 ",
    margin: "0 10px",
  },
});

function Category() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categoryStore, loaderStore } = useSelector((store) => store);
  console.log(categoryStore, "===Category Store");

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage /*setPostPerPage */] = useState(5);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentCategoryList = categoryStore.categoryList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestCategoryList());
  }, [dispatch]);
  const updateHandler = (e) => {
    console.log(e, "===event update");
    dispatch(requestCategoryDetails(e._id));
    dispatch(setCurrentCategoryId(e._id));
    dispatch(setView("edit"));
  };
  const deleteHandler = (e) => {
    dispatch(requestDeleteCategory(e._id));
    history.push("/success");
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
                    Categogy ID
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Name
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentCategoryList?.map((product) => (
                  <TableRow hover tabIndex={-1} key={product._id}>
                    <TableCell key={product?.title}>{product._id}</TableCell>

                    <TableCell key={product.quantity}>{product.name}</TableCell>

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
            totalProducts={categoryStore.categoryList.length}
            paginate={paginate}
          />
        </div>
      )}
    </>
  );
}

export default Category;
