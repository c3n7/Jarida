import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token?: string;
  username?: string;
}

const initialState: AuthState = {
  token: undefined,
  username: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = authSlice.actions;

export default authSlice.reducer;
