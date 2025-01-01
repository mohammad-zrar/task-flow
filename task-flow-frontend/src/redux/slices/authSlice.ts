import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { LoginResponse } from "../../types/entity-types";
import { isDateExpired } from "../../utils/dateUtils";
import axios from "axios";

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
  LoginResponse , // Return type
  { name: string; email: string; password: string, password_confirmation: string }, // Argument type
  { rejectValue: string } // Rejection type
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/register", userData);
    return response.data
  } catch (error) {
    if(error instanceof Error) {
       return rejectWithValue(
      error.message || "Failed to register"
    );
    
    }
   return 'Failed to register';
  }
});

export const login = createAsyncThunk<
  LoginResponse, // Return type
  { email: string; password: string }, // Argument type
  { rejectValue: string } // Rejection type
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data; // Assuming response.data is of type LoginResponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const forgotPassword = createAsyncThunk<
  LoginResponse, // Return type
  { email: string }, // Argument type
  { rejectValue: string } // Rejection type
>("auth/forgotPassword", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/forgot-password", credentials);
    return response.data; // Assuming response.data is of type LoginResponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    autoLogin(state) {

      //  state.isLoggedIn = true
      // return;

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
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction< LoginResponse >) => {
          state.loading = false;
          state.isLoggedIn = true;

          localStorage.setItem(
            "authToken",
            action.payload.token
          );
          localStorage.setItem(
            "expiresAt",
            action.payload.expires_at
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
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.isLoggedIn = true;

          localStorage.setItem(
            "authToken",
            action.payload.token
          );
          localStorage.setItem(
            "expiresAt",
            action.payload.expires_at
          );
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Invalid credentials";
        }
      )
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( forgotPassword.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.isLoggedIn = true;

        localStorage.setItem(
          "authToken",
          action.payload.token
        );
        localStorage.setItem(
          "expiresAt",
          action.payload.expires_at
        );
      })  
         .addCase(
        forgotPassword.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Invalid credentials";
        }
      )
  },
});

function performLogout(state: typeof initialState) {
  state.isLoggedIn = false;
  state.error = null;

  localStorage.removeItem("authToken");
  localStorage.removeItem("expiresAt");
}

export const { logout, autoLogin } = authSlice.actions;

export default authSlice.reducer;