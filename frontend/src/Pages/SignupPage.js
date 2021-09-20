import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Components/Miscellaneous/Loader";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { requestSignUp } from "../store/action/signUpAction";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "90vh",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  partition: {
    display: "flex",
    margin: "2% 25%",
    align: "center",
  },
  input1: {
    marginLeft: "800px",
    border: "1px solid #04b4c4",
    borderRadius: "5px",
    padding: "5px 20px",
    backgroundColor: "#04b4c4",
    color: "white",
  },
  input2: {
    marginLeft: "100px",
    border: "1px solid #FF5349",
    borderRadius: "5px",
    padding: "5px 20px",
    backgroundColor: "#FF5349",
    color: "white",
  },
  head: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
  upload: {
    textAlign: "center",
    border: "1px solid black",
    padding: "8px 15px",
    width: "400px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "20px 35px 20px 35px",
    display: "flex",
    // marginLeft: "10px",
    // alignSelf: "flex-end",
  },
  label: {
    // marginLeft: "55px",
    display: "flex",
    justifyContent: "center",
    // alignSelf: "center",
  },
  item: {
    alignItems: "justified",
  },
}));

function SignupPage() {
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
    firstName: "",
    lastName: "",
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
    dispatch(requestSignUp(user));
    history.push("/success");
    e.preventDefault();
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={classes.root}>
          <h1 className={classes.head}>Enter Details to Sign Up:</h1>
          <form autoComplete="off">
            <div className={classes.partition}>
              <div>
                <div className={classes.item}>
                  <label className={classes.label}>Username: </label>
                  <input
                    className={classes.upload}
                    placeholder="Enter Username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                  />
                </div>

                <div className={classes.item}>
                  <label className={classes.label}>Email: </label>
                  <input
                    className={classes.upload}
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                <div className={classes.item}>
                  <label className={classes.label}>Phone Number: </label>
                  <input
                    className={classes.upload}
                    placeholder="Enter Phone Number"
                    type="text"
                    name="phone"
                    onChange={handleChange}
                  />
                </div>

                <div className={classes.item}>
                  <label className={classes.label}>Password: </label>
                  <input
                    className={classes.upload}
                    placeholder="Enter Password"
                    type="password"
                    name="password"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className={classes.label}>Confirm Password: </label>
                  <input
                    className={classes.upload}
                    placeholder="Enter Password Again"
                    type="password"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label className={classes.label}>Fist Name: </label>
                  <input
                    className={classes.upload}
                    placeholder="Enter Fist Name"
                    type="text"
                    name="fistName"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className={classes.label}>Enter Name: </label>
                  <input
                    className={classes.upload}
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className={classes.label}>City: </label>
                  <input
                    className={classes.upload}
                    placeholder="Name of City"
                    type="text"
                    name="city"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className={classes.label}>Street Number: </label>
                  <input
                    className={classes.upload}
                    placeholder="Enter Street Number"
                    type="text"
                    name="streetNumber"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className={classes.label}>Zipcode: </label>
                  <input
                    className={classes.upload}
                    placeholder="Enter Zipcode"
                    type="text"
                    name="zipcode"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
          <div>
            <button onClick={handleSubmit} className={classes.input1}>
              Submit
            </button>
            <button
              onClick={() => history.push("/")}
              className={classes.input2}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupPage;
