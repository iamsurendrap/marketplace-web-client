import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdState } from '../reducers/ad-item.reducer';

export const selectAdState = createFeatureSelector<AdState>('viewAd');

export const selectSelectedAd = createSelector(
  selectAdState,
  (state: AdState) => state.selectedAd
);

export const selectAdLoading = createSelector(
  selectAdState,
  (state: AdState) => state?.loading
);

export const selectAdError = createSelector(
  selectAdState,
  (state: AdState) => state?.error
);
