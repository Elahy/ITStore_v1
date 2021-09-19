import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setLoaderValue } from "../../store/action/loaderAction";
import Loader from "../../Components/Miscellaneous/Loader";
import { useHistory } from "react-router";
import {
  requestDeleteUser,
  requestUserDetails,
  requestUserList,
  setCurrentUserId,
  setView,
} from "../../store/action/userAction";
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

function Users() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { allUserStore, loaderStore } = useSelector((store) => store);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage /*setPostPerPage */] = useState(5);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentUserList = allUserStore.userList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestUserList());
  }, [dispatch]);
  const updateHandler = (e) => {
    console.log(e._id, "===event of edit");
    dispatch(requestUserDetails(e._id));
    dispatch(setCurrentUserId(e._id));
    dispatch(setView("edit"));
  };
  const deleteHandler = (e) => {
    dispatch(requestDeleteUser(e._id));
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
                    User
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Email
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    phone
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Address
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ADD8E6" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUserList.map((user) => (
                  <TableRow hover tabIndex={-1} key={user._id}>
                    <TableCell key={user?.username}>{user.username}</TableCell>

                    <TableCell key={user.email}>{user.email}</TableCell>
                    <TableCell key={user.phone}>{user.phone}</TableCell>
                    <TableCell key={user.address?.city}>
                      {user.address?.city}
                    </TableCell>
                    <TableCell className={classes.buttons}>
                      <img
                        onClick={() => updateHandler(user)}
                        src="../images/EditIcon.svg"
                        alt="Edit icon"
                        className={classes.EditIcon}
                      />

                      <img
                        onClick={() => deleteHandler(user)}
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
            totalProducts={allUserStore.userList.length}
            paginate={paginate}
          />
        </div>
      )}
    </>
  );
}

export default Users;
