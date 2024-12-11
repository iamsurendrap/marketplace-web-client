import { createAction, props } from '@ngrx/store';
import { User } from './user.model';
import { AppState } from '../app-state/app.state';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const loginSuccessCompleted = createAction('[Auth] Login Success Completed');

export const logout = createAction('[Auth] Logout');

export const updateUser = createAction(
  '[Auth] Update User',
  props<{ user: User }>()
);

export const saveState = createAction('[Auth] Save State');

export const loadSavedState = createAction(
  '[Auth] Load Saved State',
  props<{ state: Partial<AppState> }>()
);


export const signup = createAction(
  '[Auth] Sign Up',
  props<{ firstName: string; lastName: string; email: string; password: string }>()
);

export const signupSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ user: User }>()
);

export const signupFailure = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: string }>()
);
