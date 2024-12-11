import { createReducer, on } from '@ngrx/store';
import * as ListingActions from './post-ad.actions';
import { Listing } from './listing.model';

export interface ListingState {
  listing: Listing | null;
  files: File[];
  loading: boolean;         // Indicates if the listing is being processed
  error: any;               // Holds any error messages
}

export const initialState: ListingState = {
  listing: null,
  files: [],
  loading: false,
  error: null,
};

export const listingReducer = createReducer(
  initialState,
  on(ListingActions.createListing, (state, { listing, files }) => {
    console.log('Reducer: createListing', { state });
    return {
      ...state,
      listing,
      files,
      loading: true,
      error: null,
    };
  }),
  on(ListingActions.createListingSuccess, (state, { listing }) => {
    console.log('Reducer: createListingSuccess', listing);
    return {
      ...state,
      listing,
      files : [],
      loading: false,
      error: null,
    };
  }),
  on(ListingActions.createListingFailure, (state, { error }) => {
    console.log('Reducer: createListingFailure', error);
    return {
      ...state,
      error,
      loading: false,
    };
  })
);

