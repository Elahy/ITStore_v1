import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Loader from "../../Components/Miscellaneous/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderValue } from "../../store/action/loaderAction";
import {
  // editUser,
  requestEditUser,
  setView,
} from "../../store/action/userAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "44%",
      textAlign: "center",
      marginLeft: "28%",
      marginRight: "28%",
    },
  },
  input: {
    margin: theme.spacing(1),
    marginLeft: "40%",
    backgroundColor: "#04b4c4",
  },
  input2: {
    margin: theme.spacing(1),
    marginLeft: 15,
  },
  head: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: "45%",
  },
}));

function UpdateUser() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const history = useHistory();

  const { currentUser, currentUserId } = useSelector(
    (store) => store.allUserStore
  );
  // const { userEdited } = useSelector((store) => store.allUserStore);
  const { loaderStore } = useSelector((store) => store);
  // console.log(loaderStore.loader, "===loaderStore.loader");

  const [user, setUser] = useState({
    _id: currentUserId,
    address: {
      geolocation: {
        lat: currentUser?.lat,
        long: currentUser?.long,
      },
      city: currentUser?.city,
      street: currentUser?.street,
      number: currentUser?.streetNumber,
      zipcode: currentUser?.zipcode,
    },
    role: currentUser?.role,
    email: currentUser?.email,
    username: currentUser?.userName,
    phone: currentUser?.phone,
    password: currentUser?.password,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    dispatch(setLoaderValue(true));
    dispatch(requestEditUser(user));
    dispatch(setView("all"));
  };

  // useEffect(() => {
  //   if (userEdited !== null) {
  //     dispatch(setView("all"));
  //     dispatch(editUser(null));
  //   }
  // }, [dispatch, userEdited]);

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div>
          <Typography
            variant="h3"
            align="center"
            className={classes.head}
            gutterBottom
          >
            Edit User info
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Username"
                multiline
                maxRows={4}
                required
                placeholder="Placeholder"
                variant="outlined"
                type="text"
                name="username"
                defaultValue={currentUser?.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Email"
                multiline
                placeholder="Placeholder"
                variant="outlined"
                type="email"
                name="email"
                defaultValue={currentUser?.email}
                onChange={handleChange}
              />
              <div />
              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Phone"
                  multiline
                  placeholder="Placeholder"
                  variant="outlined"
                  type="text"
                  name="phone"
                  defaultValue={currentUser?.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextField
                  id="outlined-textarea"
                  label="Password"
                  placeholder="Placeholder"
                  multiline
                  variant="outlined"
                  type="password"
                  name="password"
                  defaultValue={currentUser?.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  id="outlined-textarea"
                  label="City"
                  multiline
                  placeholder="Placeholder"
                  variant="outlined"
                  type="text"
                  name="city"
                  defaultValue={currentUser?.address?.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <Button
            onClick={handleSubmit}
            className={classes.input}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            onClick={() => dispatch(setView("all"))}
            className={classes.input2}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}

export default UpdateUser;
