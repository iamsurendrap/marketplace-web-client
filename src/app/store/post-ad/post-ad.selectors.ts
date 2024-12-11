import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListingState } from './post-ad.reducer';

// Ensure you're targeting the feature-scoped state
export const selectListingState = createFeatureSelector<ListingState>('listing');

// Loading selector
export const selectLoading = createSelector(
  selectListingState,
  (state: ListingState) => state?.loading
);

// Error selector
export const selectError = createSelector(
  selectListingState,
  (state: ListingState) => state?.error
);

// Listing selector
export const selectListing = createSelector(
  selectListingState,
  (state: ListingState) => state?.listing
);
