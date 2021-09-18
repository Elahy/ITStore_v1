import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import loaderReducer from "./loaderReducer";
import signInReducer from "./signInReducer";
import userReducer from "./userReducer";
import storage from "redux-persist/lib/storage";
import myInfoReducer from "./myInfoReducer";
import categoryReducer from "./categoryReducer";
import orderReducer from "./orderReducer";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedSignInInfo = persistReducer(persistConfig, signInReducer);
const persistedCart = persistReducer(persistConfig, cartReducer);

const mainReducer = combineReducers({
  productStore: productReducer,
  cartStore: persistedCart,
  loaderStore: loaderReducer,
  signInStore: persistedSignInInfo,
  allUserStore: userReducer,
  myInfoStore: myInfoReducer,
  categoryStore: categoryReducer,
  orderStore: orderReducer,
});

export default mainReducer;
