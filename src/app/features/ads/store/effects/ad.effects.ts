// src/app/features/ads/store/effects/ad.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AdActions from '../actions/ad.actions';
import { AdService } from '../../services/ad.service';

@Injectable()
export class AdEffects {
  loadAds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdActions.loadAds),
      mergeMap(({ page, limit, category }) =>
        this.adService.getAds(page, limit, category).pipe(
          map(adResponse => AdActions.loadAdsSuccess({ adResponse })),
          catchError(error => of(AdActions.loadAdsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private adService: AdService
  ) {}
}