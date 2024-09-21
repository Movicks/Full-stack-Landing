// authSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, signup } from "./authThunks";
import { toast } from "react-toastify";
import { User } from "../../types";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Check if there's a token in local storage
const authToken = localStorage.getItem("authToken");
const initialAuthState: AuthState = {
  ...initialState,
  user: authToken ? JSON.parse(localStorage.getItem("user") || "null") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("authToken"); // Remove token on logout
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Store user data
        toast.success("Login successful!");
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Store user data
        toast.success("Sign up successful!");
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred during login.";
        toast.error(state.error);
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred during signup.";
        toast.error(state.error);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
