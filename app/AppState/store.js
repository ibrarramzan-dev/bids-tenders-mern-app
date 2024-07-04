import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default storage is localStorage
import userReducer from "./Features/user/userSlice";
import bidsReducer from "./Features/bids/bidsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  bids: bidsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
  // devTools: process.env.NODE_ENV !== "production",
});

const persistedStore = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     bids: bidsReducer,
//   },
// });
