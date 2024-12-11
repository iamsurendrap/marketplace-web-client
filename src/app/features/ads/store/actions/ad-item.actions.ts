import { createAction, props } from '@ngrx/store';
import { Ad } from '../../models/ad.model';

export const loadAdById = createAction(
  '[Ad] Load Ad by ID',
  props<{ id: string }>()
);

export const loadAdByIdSuccess = createAction(
  '[Ad] Load Ad by ID Success',
  props<{ ad: Ad }>()
);

export const loadAdByIdFailure = createAction(
  '[Ad] Load Ad by ID Failure',
  props<{ error: any }>()
);

export const clearSelectedAd = createAction('[Ad Item] Clear Selected Ad');

export const updateAd = createAction(
  '[Listing] Update Ad',
  props<{ listing: { _id: string; title: string; description: string; category: string; price: number; imageURLs: string[]; newFiles: File[] } }>()
);

export const updateAdSuccess = createAction(
  '[Listing] Update Ad Success',
  props<{ listing: any }>()
);

export const updateAdFailure = createAction(
  '[Listing] Update Ad Failure',
  props<{ error: string }>()
);


