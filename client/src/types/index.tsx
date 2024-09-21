// Defines the state for the auth slice
// types/index.tsx
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Defines a user type
export interface User {
    id: string;
    email: string;
    username: string; 
    password?: string; // this can be optional if it's not needed in the state
}
