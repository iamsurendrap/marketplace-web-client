import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ListingService } from './post-ad.service';
import * as ListingActions from './post-ad.actions';
import { Router } from '@angular/router';

@Injectable()
export class ListingEffects {
  createListing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingActions.createListing),
      tap(action => console.log('CreateListing Action Dispatched:', action)),
      mergeMap(({ listing, files }) =>
        this.listingService.createListing(listing, files).pipe(
          tap(response => console.log('API Response:', response)),
          map(createdListing => {
            console.log('CreateListingSuccess Action Dispatched:', createdListing);
            return ListingActions.createListingSuccess({ listing: createdListing });
          }),
          catchError(error => {
            console.error('Error in createListing effect:', error);
            return of(ListingActions.createListingFailure({ error }));
          })
        )
      )
    )
  );

  createListingSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ListingActions.createListingSuccess),
        tap(({ listing }) => {
          console.log('Navigating to view-ad page for:', listing._id);
          this.router.navigate(['view-ad', listing._id]);
        })
      ),
    { dispatch: false }
  );


  constructor(
    private actions$: Actions,
    private listingService: ListingService,
    private router: Router
  ) {}
}
