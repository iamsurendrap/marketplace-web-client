// src/app/features/ads/store/reducers/ad.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AdActions from '../actions/ad.actions';
import { Ad } from '../../models/ad.model';

export interface AdState {
  ads: Ad[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: any;
}

export const initialState: AdState = {
  ads: [],
  totalPages: 0,
  currentPage: 0,
  loading: false,
  error: null
};

export const adReducer = createReducer(
  initialState,
  on(AdActions.loadAds, state => ({ ...state, loading: true })),
  on(AdActions.loadAdsSuccess, (state, { adResponse }) => ({
    ...state,
    ads: adResponse.currentPage === 1
      ? [...adResponse.listings]
      : [...state.ads, ...adResponse.listings],
    totalPages: adResponse.totalPages,
    currentPage: adResponse.currentPage,
    loading: false
  })),
  on(AdActions.loadAdsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);