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
