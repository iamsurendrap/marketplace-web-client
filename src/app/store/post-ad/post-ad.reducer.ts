import { createReducer, on } from '@ngrx/store';
import * as ListingActions from './post-ad.actions';
import { Listing } from './listing.model';

export interface ListingState {
  listings: Listing[];
  loading: boolean;
  error: any;
}

export const initialState: ListingState = {
  listings: [],
  loading: false,
  error: null
};

export const listingReducer = createReducer(
  initialState,
  on(ListingActions.createListing, state => ({ ...state, loading: true })),
  on(ListingActions.createListingSuccess, (state, { listing }) => ({
    ...state,
    listings: [...state.listings, listing],
    loading: false
  })),
  on(ListingActions.createListingFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);