import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { requestSignIn } from "../store/action/signInAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { setLoaderValue } from "../store/action/loaderAction";

const useStyles = makeStyles({
  container: {
    padding: "0",
    margin: "60px 0",
    borderRadius: "20px",
  },
  icon: {
    width: "35px",
    margin: "0 5px",
  },
  iconf: {
    width: "45px",
    margin: "0 5px",
  },
});

function LoginPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { loader } = useSelector((store) => store.loaderStore);
  // const { token } = useSelector((store) => store.userInfoStore);
  console.log(loader, "===loader");
  const [cred, setCred] = useState([]);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setLoaderValue(true));
    dispatch(requestSignIn(cred));
    console.log(cred, "===credential");
    history.push("/");
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <Grid container spacing={0}>
            <Grid item xs={false} lg={2}></Grid>
            <Grid item xs={12} lg={4} className={classes.container}>
              <img
                className={styles.image}
                src="../images/loginimg.jpg"
                alt="Login display"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <form className={styles.formContainer}>
                <h1 className={styles.header}>Sign in</h1>
                <div className={styles.socialContainer}>
                  <Link to="/facebook" className={styles.social}>
                    <img
                      className={classes.iconf}
                      src="./images/facebook.svg"
                      alt="userIcon"
                    />
                  </Link>
                  <Link to="www.google.com" className={styles.social}>
                    <img
                      className={classes.icon}
                      src="./images/google-plus.svg"
                      alt="userIcon"
                    />
                  </Link>
                  <Link to="www.facebook.com" className={styles.social}>
                    <img
                      className={classes.icon}
                      src="./images/twittericon.svg"
                      alt="userIcon"
                    />
                  </Link>
                </div>
                <span>or use your account </span>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Email"
                  defaultValue={cred.email}
                  onChange={(e) => setCred({ ...cred, email: e.target.value })}
                  autoComplete="on"
                />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                  defaultValue={cred.password}
                  onChange={(e) =>
                    setCred({ ...cred, password: e.target.value })
                  }
                  autoComplete="on"
                />
                <Link href="#">Forgot your password?</Link>
                <p className={styles.para}>
                  Don't have a account? <Link to="/signup">Sign Up!</Link>
                </p>
                <button className={styles.button} onClick={handleLogin}>
                  Sign In
                </button>
              </form>
            </Grid>
            <Grid item xs={false} lg={2}></Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default LoginPage;
