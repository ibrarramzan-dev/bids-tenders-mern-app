import { createSlice } from "@reduxjs/toolkit";

const initState = [];

export const bidsSlice = createSlice({
  name: "bids",
  initialState: initState,
  reducers: {
    loadBids: (state, action) => action.payload,
  },
});

export const { loadBids } = bidsSlice.actions;

export default bidsSlice.reducer;
