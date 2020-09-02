import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "weather",
  storage: storage,
  whitelist: ["weather"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
