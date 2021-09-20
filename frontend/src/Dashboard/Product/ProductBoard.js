import React from "react";
import Products from "./Products";
import AddProduct from "./AddProduct";
import { useSelector } from "react-redux";
import UpdateProduct from "./UpdateProduct";
import DashNav from "../DashNav";

function ProductBoard() {
  const { view } = useSelector((store) => store.allUserStore);

  return (
    <div>
      <DashNav keyword={"Product"} />
      {view === "all" ? (
        <Products />
      ) : view === "add" ? (
        <AddProduct />
      ) : view === "edit" ? (
        <UpdateProduct />
      ) : (
        <p>Select</p>
      )}
    </div>
  );
}

export default ProductBoard;
