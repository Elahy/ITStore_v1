import React, { useEffect } from "react";
import Users from "./Users";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderValue } from "../../store/action/loaderAction";
import { setView } from "../../store/action/userAction";
import DashNav from "../DashNav";

function UserBoard() {
  const dispatch = useDispatch();
  const { view } = useSelector((store) => store.allUserStore);

  useEffect(() => {
    dispatch(setLoaderValue(false));
    dispatch(setView("all"));
  }, [dispatch]);

  return (
    <div>
      <DashNav keyword={"User"} />
      {view === "all" ? (
        <Users setView />
      ) : view === "add" ? (
        <AddUser />
      ) : view === "edit" ? (
        <UpdateUser />
      ) : (
        <p>Select</p>
      )}
    </div>
  );
}

export default UserBoard;
