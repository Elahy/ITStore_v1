import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setLoaderValue } from "../../store/action/loaderAction";
import Loader from "../../Components/Loader";
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
  const userList = allUserStore.userList;
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
          <div>
            <div>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>phone</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList.map((user) => (
                      <TableRow hover tabIndex={-1} key={user._id}>
                        <TableCell key={user?.username}>
                          {user.username}
                        </TableCell>

                        <TableCell key={user.email}>{user.email}</TableCell>
                        <TableCell key={user.email}>{user.phone}</TableCell>
                        <TableCell key={user.email}>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Users;
