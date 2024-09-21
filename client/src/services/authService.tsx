// authService.tsx
import axios from "axios";

// Ensure that the API_URL is defined
const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error("VITE_API_URL is not defined in environment variables");
}

axios.defaults.withCredentials = true; // Configuring axios globally if needed

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      //   console.log('Registering with:', credentials);
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      // Handle or rethrow error if necessary
      throw error;
    }
  },

  register: async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      //   console.log('Registering with:', formData);  // Debugging line
      const response = await axios.post(`${API_URL}/signup`, formData);
      return response.data;
    } catch (error) {
      // console.error('Sign Up error:', error);  // Log the error for debugging
      // Handle or rethrow error if necessary
      throw error;
    }
  },
};
