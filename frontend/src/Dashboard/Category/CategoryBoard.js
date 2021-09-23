import React from "react";
import Category from "./Category";
import AddCategory from "./AddCategory";
import { useSelector } from "react-redux";
import UpdateCategory from "./UpdateCategory";
import DashNav from "../DashNav";

function CategoryBoard() {
  const { view } = useSelector((store) => store.allUserStore);

  return (
    <div>
      <DashNav keyword={"Ctg."} />
      {view === "all" ? (
        <Category />
      ) : view === "add" ? (
        <AddCategory />
      ) : view === "edit" ? (
        <UpdateCategory />
      ) : (
        <p>Select</p>
      )}
    </div>
  );
}

export default CategoryBoard;
