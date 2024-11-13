// src/app/features/ads/store/selectors/ad.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdState } from '../reducers/ad.reducer';

export const selectAdState = createFeatureSelector<AdState>('ads');

export const selectAllAds = createSelector(
  selectAdState,
  (state: AdState) => state.ads
);

export const selectTotalPages = createSelector(
  selectAdState,
  (state: AdState) => state.totalPages
);

export const selectCurrentPage = createSelector(
  selectAdState,
  (state: AdState) => state.currentPage
);

export const selectAdsLoading = createSelector(
  selectAdState,
  (state: AdState) => state.loading
);

export const selectAdsError = createSelector(
  selectAdState,
  (state: AdState) => state.error
);