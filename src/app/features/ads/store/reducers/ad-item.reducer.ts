import { createReducer, on } from '@ngrx/store';
import { Ad } from '../../models/ad.model';
import { loadAdById, loadAdByIdSuccess, loadAdByIdFailure, clearSelectedAd, updateAd, updateAdFailure, updateAdSuccess } from '../actions/ad-item.actions';

export interface AdState {
  selectedAd: Ad | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AdState = {
  selectedAd: null,
  loading: false,
  error: null,
};

export const adItemReducer = createReducer(
  initialState,
  on(loadAdById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadAdByIdSuccess, (state, { ad }) => ({
    ...state,
    selectedAd: ad,
    loading: false,
    error: null,
  })),
  on(loadAdByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(clearSelectedAd, () => initialState),
  on(updateAd, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(updateAdSuccess, (state, { listing }) => ({
    ...state,
    selectedAd: listing, // Update the ad with the new data
    loading: false,
    error: null,
  })),
  on(updateAdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))

);
