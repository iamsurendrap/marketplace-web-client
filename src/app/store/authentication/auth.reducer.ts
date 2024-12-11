import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './user.model';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, user: null, loading: false, error })),
  on(AuthActions.logout, state => ({ ...state, user: null, error: null })),
  on(AuthActions.updateUser, (state, { user }) => ({ ...state, user })),
  on(AuthActions.loadSavedState, (state, { state: savedState }) => ({
    ...state,
    ...(savedState.auth as AuthState)
  })),
  on(AuthActions.signup, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.signupSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(AuthActions.signupFailure, (state, { error }) => ({ ...state, user: null, loading: false, error }))
);
