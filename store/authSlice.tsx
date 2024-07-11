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

export type UserProfile = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async ({ token }: { token: string }, thunkApi) => {
    return await fetch(`${Config.API_URL}/dj-rest-auth/user/`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
      },
    }).then(async (response) => (await response.json()) as UserProfile);
  }
);

export type UpdateProfilePayload = {
  token: string;
  username?: string;
  first_name: string;
  last_name: string;
};

export type UpdateProfileResponse = {
  username?: string;
  first_name?: string;
  last_name?: string;
  message?: string;
};

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    { token, username, first_name, last_name }: UpdateProfilePayload,
    thunkApi
  ) => {
    return await fetch(`${Config.API_URL}/dj-rest-auth/user/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, first_name, last_name }),
    }).then(async (response) => {
      let result: UpdateProfileResponse | null = null;
      if (response.headers.get("content-type") === "application/json") {
        result = (await response.json()) as UpdateProfileResponse;
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
  profile?: UserProfile;

  signUpStatus: ThunkStatus;
  signInStatus: ThunkStatus;
  profileStatus: ThunkStatus;
  updatePasswordStatus: ThunkStatus;
  updateProfileStatus: ThunkStatus;
}

const initialState: AuthState = {
  token: undefined,
  username: undefined,
  profile: undefined,

  signUpStatus: "idle",
  signInStatus: "idle",
  profileStatus: "idle",
  updatePasswordStatus: "idle",
  updateProfileStatus: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = undefined;
      AsyncStorage.removeItem("token");
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

    builder.addCase(fetchProfile.pending, (state) => {
      state.profileStatus = "pending";
    });
    builder.addCase(fetchProfile.rejected, (state) => {
      state.profileStatus = "rejected";
    });
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      state.profile = payload;
      state.profileStatus = "fulfilled";
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.updateProfileStatus = "pending";
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.updateProfileStatus = "rejected";
    });
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.updateProfileStatus = "fulfilled";
    });
  },
});

export const { setUsername, setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
