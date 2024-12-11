import { createAction, props } from '@ngrx/store';
import { Listing } from './listing.model';

export const createListing = createAction(
  '[Listing] Create Listing',
  props<{ listing: Listing, files: File[] }>()
);

export const createListingSuccess = createAction(
  '[Listing] Create Listing Success',
  props<{ listing: Listing }>()
);

export const createListingFailure = createAction(
  '[Listing] Create Listing Failure',
  props<{ error: any }>()
);
