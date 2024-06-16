import { createSlice } from "@reduxjs/toolkit";

const initState = {
  type: "guest",
  data: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    loginUser: (state, action) => ({ ...action.payload }),
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
