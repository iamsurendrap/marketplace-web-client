import { AuthState } from "../authentication/auth.reducer";


export interface AppState {
  auth: AuthState;
  // ... other state slices if needed
}

export const initialAppState: AppState = {
  auth: {
    user: null,
    loading: false,
    error: null
  },
  // ... initialize other state slices if needed
};