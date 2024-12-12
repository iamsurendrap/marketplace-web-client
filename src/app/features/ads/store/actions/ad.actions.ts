// src/app/features/ads/store/actions/ad.actions.ts
import { createAction, props } from '@ngrx/store';
import { Ad, AdResponse } from '../../models/ad.model';

export const loadAds = createAction('[Ad] Load Ads', props<{ page: number, limit: number, category: string }>());
export const loadAdsSuccess = createAction(
    '[Ad] Load Ads Success',
    props<{ adResponse: AdResponse }>()
);
export const loadAdsFailure = createAction('[Ad] Load Ads Failure', props<{ error: any }>());

export const loadFavourites = createAction('[Ad] Load favorites', props<{ page: number, limit: number, category: string, userId: string }>());

export const loadUserListings = createAction('[Ad] Load user listings', props<{ page: number, limit: number, category: string, userId: string }>());

export const clearAdsList = createAction('[Ad] Clear all the loaded lists');
