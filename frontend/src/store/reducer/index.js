import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import loaderReducer from "./loaderReducer";
import signInReducer from "./signInReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedUserInfo = persistReducer(persistConfig, signInReducer);
const persistedCart = persistReducer(persistConfig, cartReducer);

const mainReducer = combineReducers({
  productStore: productReducer,
  cartStore: persistedCart,
  loaderStore: loaderReducer,
  userInfoStore: persistedUserInfo,
});

export default mainReducer;
