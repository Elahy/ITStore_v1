import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(mainReducer, composeEnhancer);

export const persistor = persistStore(store);
