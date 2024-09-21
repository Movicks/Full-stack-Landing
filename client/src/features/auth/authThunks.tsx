// authThunks.tsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

const isErrorWithMessage = (error: unknown): error is { response: { data: { error: string } } } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response: { data: { error: string } } }).response.data.error === "string"
  );
};

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
}

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const { user, token } = await authService.login(credentials);
    localStorage.setItem("authToken", token);
    return user;
  } catch (error) {
    if (isErrorWithMessage(error)) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    } else {
      return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
  }
});

export const signup = createAsyncThunk<
  User,
  { username: string; email: string; password: string },
  { rejectValue: string }
>("auth/signup", async (formData, thunkAPI) => {
  try {
    const { user, token } = await authService.register(formData);
    localStorage.setItem("authToken", token);
    return user;
  } catch (error) {
    if (isErrorWithMessage(error)) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    } else {
      return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
  }
});