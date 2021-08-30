import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./CartReducer";
import loaderReducer from "./loaderReducer";
import signInReducer from "./signInReducer";

const mainReducer = combineReducers({
  productStore: productReducer,
  cartStore: cartReducer,
  loaderStore: loaderReducer,
  UserInfoStore: signInReducer,
});

export default mainReducer;
