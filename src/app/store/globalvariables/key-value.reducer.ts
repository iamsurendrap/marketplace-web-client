import { createReducer, on } from '@ngrx/store';
import * as KeyValueActions from './key-value.actions';

export interface KeyValueState {
  [key: string]: any;
}

export const initialState: KeyValueState = {};

export const keyValueReducer = createReducer(
  initialState,
  on(KeyValueActions.setKeyValue, (state, { key, value }) => ({
    ...state,
    [key]: value,
  })),
  on(KeyValueActions.removeKeyValue, (state, { key }) => {
    const { [key]: removed, ...rest } = state; // Remove the key from the state
    return rest;
  }),
  on(KeyValueActions.clearAllKeys, () => ({})) // Clear the entire state
);
