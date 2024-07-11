import Config from "@/constants/Config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkStatus } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

      if (!response.ok) {
        result ??= { message: "Operation Failed." };
        return thunkApi.rejectWithValue(result);
      }

      return result;
    });
  }
);

export type UpdatePasswordPayload = {
  token: string;
  new_password1: string;
  new_password2: string;
};
export type UpdatePasswordResponse = {
  new_password1?: string;
  new_password2?: string;
  message?: string;
};

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (
    { token, new_password1, new_password2 }: UpdatePasswordPayload,
    thunkApi
  ) => {
    return await fetch(`${Config.API_URL}/dj-rest-auth/password/change/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_password1, new_password2 }),
    }).then(async (response) => {
      let result: UpdatePasswordResponse | null = null;
      if (response.headers.get("content-type") === "application/json") {
        result = (await response.json()) as UpdatePasswordResponse;
      }

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
  updatePasswordStatus: ThunkStatus;
}

const initialState: AuthState = {
  token: undefined,
  username: undefined,
  signUpStatus: "idle",
  signInStatus: "idle",
  updatePasswordStatus: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      AsyncStorage.setItem("username", action.payload);
      state.username = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = undefined;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("username");
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
      if (payload?.key) {
        AsyncStorage.setItem("token", payload.key);
      }
      state.signInStatus = "fulfilled";
    });

    builder.addCase(updatePassword.pending, (state) => {
      state.updatePasswordStatus = "pending";
    });
    builder.addCase(updatePassword.rejected, (state) => {
      state.updatePasswordStatus = "rejected";
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.updatePasswordStatus = "fulfilled";
    });
  },
});

export const { setUsername, setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
