import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../Components/Miscellaneous/Loader";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { requestAddUser, setView } from "../../store/action/userAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80%",
      textAlign: "center",
      marginLeft: "10%",
    },
  },
  input1: {
    margin: theme.spacing(1),
    marginLeft: "30%",
    backgroundColor: "#04b4c4",
  },
  input2: {
    margin: theme.spacing(1),
    marginLeft: 15,
  },
  head: {
    margin: theme.spacing(1),
  },
  upload: {
    textAlign: "center",
    border: "2px solid black",
    padding: "8px 15px",
    maxWidth: "50px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  imageWrap: {
    display: "flex",
  },
  image: {
    marginLeft: "10%",
  },
}));

function AddUser() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loader } = useSelector((store) => store.loaderStore);
  const [user, setUser] = useState({
    city: "",
    streetNumber: "",
    zipcode: "",
    role: "",
    email: "",
    username: "",
    phone: "",
    password: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    dispatch(requestAddUser(user));
    history.push("/success");
    e.preventDefault();
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <Typography
            variant="h3"
            align="center"
            className={classes.head}
            gutterBottom
          >
            Add User Details
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Username"
                placeholder="Username"
                multiline
                maxRows={4}
                variant="outlined"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Email"
                placeholder="Email"
                multiline
                variant="outlined"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Phone"
                placeholder="Phone"
                multiline
                variant="outlined"
                type="text"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Password"
                placeholder="Password"
                multiline
                variant="outlined"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Role"
                placeholder="Role"
                multiline
                variant="outlined"
                type="text"
                name="role"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="City"
                placeholder="City"
                multiline
                variant="outlined"
                type="text"
                name="city"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="streetNumber"
                placeholder="streetNumber"
                multiline
                variant="outlined"
                type="text"
                name="streetNumber"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Zipcode"
                placeholder="Zipcode"
                multiline
                variant="outlined"
                type="text"
                name="zipcode"
                onChange={handleChange}
              />
            </div>
          </form>
          <div>
            <Button
              onClick={handleSubmit}
              className={classes.input1}
              variant="contained"
              color="primary"
            >
              Submit
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
        </div>
      )}
    </>
  );
}

export default AddUser;
