import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/user/userSlice";
import bidsReducer from "./Features/bids/bidsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bids: bidsReducer,
  },
});
