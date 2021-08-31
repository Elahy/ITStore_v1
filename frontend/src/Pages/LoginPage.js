import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import Grid from "@material-ui/core/Grid";
import { requestSignIn } from "../store/action/signInAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { setLoaderValue } from "../store/action/loaderAction";

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loader } = useSelector((store) => store.loaderStore);
  const { token } = useSelector((store) => store.userInfoStore);
  console.log(loader, "===loader");
  const [cred, setCred] = useState([]);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setLoaderValue(true));
    dispatch(requestSignIn(cred));
    console.log(cred, "===credential");
  };
  if (token) {
    history.push("/");
  }
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <Grid container spacing={3}>
            <Grid item xs={false} md={4}></Grid>
            <Grid item xs={12} md={4}>
              <form className={styles.body}>
                <p>Email:</p>
                <input
                  type="email"
                  defaultValue={cred.email}
                  onChange={(e) => setCred({ ...cred, email: e.target.value })}
                  autoComplete="on"
                ></input>

                <p>Password:</p>
                <input
                  type="password"
                  defaultValue={cred.password}
                  onChange={(e) =>
                    setCred({ ...cred, password: e.target.value })
                  }
                  autoComplete="on"
                ></input>
                <p>Forgot password?</p>
                <button onClick={handleLogin} className={styles.body}>
                  Login
                </button>
              </form>
            </Grid>
            <Grid item xs={false} md={4}></Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default LoginPage;
