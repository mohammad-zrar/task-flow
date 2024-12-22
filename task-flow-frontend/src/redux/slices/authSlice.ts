import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { Token } from "../../types/entity-types.ts";
import { isDateExpired } from "../../utils/dateUtils.ts";

const initialState: {
  isLoggedIn: boolean;
  error: string | null;
  loading: boolean;
} = {
  isLoggedIn: false,
  error: null,
  loading: false,
};

export const register = createAsyncThunk<
  { token: Token }, // Return type
  { id: string; name: string; email: string; password: string }, // Argument type
  { rejectValue: string } // Rejection type
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/public/register", userData);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to register"
    );
  }
});

export const login = createAsyncThunk<
  { token: Token }, // Return type
  { id: string; password: string }, // Argument type
  { rejectValue: string } // Rejection type
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/public/login", credentials);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Invalid credentials"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    autoLogin(state) {

    //    state.isLoggedIn = true
    //   return;

      const authToken = localStorage.getItem("authToken");
      const expiresAt = localStorage.getItem("expiresAt");

      if (authToken && expiresAt && !isDateExpired(expiresAt)) {
        state.isLoggedIn = true;
        return;
      }

      performLogout(state);
    },
    logout(state) {
      performLogout(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle register async actions
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ token: Token }>) => {
          state.loading = false;
          state.isLoggedIn = true;

          localStorage.setItem(
            "authToken",
            action.payload.token.plainTextToken
          );
          localStorage.setItem(
            "expiresAt",
            action.payload.token.accessToken.expires_at
          );
        }
      )
      .addCase(
        register.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to register";
        }
      )
      // Handle login async actions
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: Token }>) => {
          state.loading = false;
          state.isLoggedIn = true;

          localStorage.setItem(
            "authToken",
            action.payload.token.plainTextToken
          );
          localStorage.setItem(
            "expiresAt",
            action.payload.token.accessToken.expires_at
          );
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Invalid credentials";
        }
      );
  },
});

function performLogout(state: any) {
  state.isLoggedIn = false;
  state.user = null;
  state.error = null;

  localStorage.removeItem("authToken");
  localStorage.removeItem("expiresAt");
}

export const { logout, autoLogin } = authSlice.actions;

export default authSlice.reducer;