import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: {
    birthDate: null,
    country: null,
    createdAt: null,
    email: null,
    gender: null,
    wishlist: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
    },
    clearUser: (state) => {
        state.accessToken = null;
        state.user = initialState.user;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUser, clearUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
