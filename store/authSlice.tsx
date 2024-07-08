import Config from "@/constants/Config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkStatus } from "./store";

export type SignUpPayload = {
  username: string;
  password1: string;
  password2: string;
};

export type SignUpResponse = {
  username?: string;
  password1?: string;
  password2?: string;
  message?: string;
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ username, password1, password2 }: SignUpPayload, thunkApi) => {
    return await fetch(`${Config.API_URL}/dj-rest-auth/registration/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password1, password2 }),
    }).then(async (response) => {
      let result: SignUpResponse | null = null;
      if (response.headers.get("content-type") === "application/json") {
        result = (await response.json()) as SignUpResponse;
      }

      if (!response.ok) {
        result ??= { message: "Operation Failed." };
        return thunkApi.rejectWithValue(result);
      }

      return result;
    });
  }
);

export type SignInPayload = {
  username: string;
  password: string;
};
export type SignInResponse = {
  username?: string;
  password?: string;
  non_field_errors?: string;
  message?: string;
  key?: string;
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ username, password }: SignInPayload, thunkApi) => {
    return await fetch(`${Config.API_URL}/dj-rest-auth/login/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then(async (response) => {
      let result: SignInResponse | null = null;
      if (response.headers.get("content-type") === "application/json") {
        result = (await response.json()) as SignInResponse;
      }

      console.log("SignIn", result);
      if (!response.ok) {
        result ??= { message: "Operation Failed." };
        return thunkApi.rejectWithValue(result);
      }

      return result;
    });
  }
);

interface AuthState {
  token?: string;
  username?: string;
  signUpStatus: ThunkStatus;
  signInStatus: ThunkStatus;
}

const initialState: AuthState = {
  token: undefined,
  username: undefined,
  signUpStatus: "idle",
  signInStatus: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.signUpStatus = "pending";
    });
    builder.addCase(signUp.rejected, (state) => {
      state.signUpStatus = "rejected";
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.signUpStatus = "fulfilled";
    });

    builder.addCase(signIn.pending, (state) => {
      state.signInStatus = "pending";
    });
    builder.addCase(signIn.rejected, (state) => {
      state.signInStatus = "rejected";
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.token = payload?.key;
      state.signInStatus = "fulfilled";
    });
  },
});

export const { setUsername } = authSlice.actions;

export default authSlice.reducer;
