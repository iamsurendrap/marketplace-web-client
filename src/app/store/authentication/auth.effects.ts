import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from './auth.service';
import { AppState } from '../app-state/app.state';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(response => AuthActions.loginSuccess({ user: response.data })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  saveState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.logout, AuthActions.updateUser, AuthActions.saveState),
      withLatestFrom(this.store),
      tap(([action, state]) => {
        localStorage.setItem('appState', JSON.stringify(state));
      })
    ),
    { dispatch: false }
  );

  loadSavedState$ = createEffect(() =>
    this.actions$.pipe(
      ofType('@ngrx/store/init'),
      tap(() => {
        const savedState = localStorage.getItem('appState');
        if (savedState) {
          this.store.dispatch(AuthActions.loadSavedState({ state: JSON.parse(savedState) }));
        }
      })
    ),
    { dispatch: false }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ firstName, lastName, email, password }) =>
        this.authService.signup(firstName, lastName, email, password).pipe(
          map(response => AuthActions.signupSuccess({ user: response.data })),
          catchError(error => of(AuthActions.signupFailure({ error: error.message })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
}
