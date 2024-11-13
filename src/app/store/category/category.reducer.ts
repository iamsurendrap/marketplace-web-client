// src/app/store/reducers/category.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Category } from '../category/category.model';
import * as CategoryActions from '../category/category.actions';

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: any;
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, state => ({
    ...state,
    loading: true
  })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false
  })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);