import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ProductBoard from "./ProductBoard";

function Dashboard() {
  const [showProduct, setShowProduct] = useState(false);
  const productMenu = () => {
    setShowProduct(true);
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <Grid container>
        <Grid item lg={1}></Grid>
        <Grid item lg={3}>
          <p>Menu</p>
          <ul>
            <li>User</li>
            <li onClick={productMenu}>Product</li>
            <li>Orders</li>
            <li>Category</li>
          </ul>
        </Grid>
        <Grid item lg={1}></Grid>
        <Grid item lg={5}>
          {showProduct ? <ProductBoard /> : <p>Welcome!</p>}
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
