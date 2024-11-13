import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from '../../../store/authentication/auth.actions';
import { AuthDialogService } from '../../../services/auth-dialog.service';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthDialogEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.authDialogService.closeDialog()),
      map(() => AuthActions.loginSuccessCompleted()),
    )
  );

  constructor(
    private actions$: Actions,
    private authDialogService: AuthDialogService,
    private store: Store
  ) {}
}