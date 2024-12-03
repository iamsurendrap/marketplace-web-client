import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdService } from '../../services/ad.service';
import { loadAdById, loadAdByIdSuccess, loadAdByIdFailure } from '../actions/ad-item.actions';

@Injectable()
export class AdItemEffects {
  loadAdById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAdById),
      mergeMap(({ id }) =>
        this.adService.getAdById(id).pipe(
          map((ad) => loadAdByIdSuccess({ ad })),
          catchError((error) => of(loadAdByIdFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private adService: AdService) {}
}
