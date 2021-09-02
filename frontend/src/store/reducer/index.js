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

const persistedStore = persistReducer(persistConfig, signInReducer);

const mainReducer = combineReducers({
  productStore: productReducer,
  cartStore: cartReducer,
  loaderStore: loaderReducer,
  userInfoStore: persistedStore,
});

export default mainReducer;
