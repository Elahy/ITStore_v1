import React, { useState } from "react";
import styles from "./Login.module.css";
import Grid from "@material-ui/core/Grid";

function LoginPage() {
  const [email, setEmail] = useState([""]);
  const [password, setPassword] = useState([""]);
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(password, "===credential");
  };
  return (
    <div className={styles.main}>
      <Grid container spacing={3}>
        <Grid item xs={false} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <form className={styles.body}>
            <p>Email:</p>
            <input
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <p>Password:</p>
            <input
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
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
  );
}

export default LoginPage;
