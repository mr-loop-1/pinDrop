import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    fillUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, fillUser } = authSlice.actions;

export const store = configureStore({
  reducer: { auth: authSlice.reducer },
});
