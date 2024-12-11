import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdService } from '../../services/ad.service';
import { loadAdById, loadAdByIdSuccess, loadAdByIdFailure, updateAd, updateAdFailure, updateAdSuccess } from '../actions/ad-item.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setKeyValue } from 'src/app/store/globalvariables/key-value.actions';
import { constants } from 'src/app/globalconstants/global-constants';

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

  updateAd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAd),
      mergeMap(({ listing }) =>
        this.adService.updateAd(listing).pipe(
          map((response) =>
            updateAdSuccess({ listing: response.data })
          ),
          catchError((error) =>
            of(updateAdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateAdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateAdSuccess),
        tap(({ listing }) => {
          this.store.dispatch(setKeyValue({ key: constants.AD_UPDATE, value: 'updated' }));
          this.router.navigate([`/view-ad/${listing._id}`]);
        })
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions, private adService: AdService, private router: Router, private store: Store) {}

}
