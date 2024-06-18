import { createSlice } from "@reduxjs/toolkit";

const initState = {
  type: "guest",
  data: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    login: (state, action) => ({ ...action.payload }),
    logout: () => initState,
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
