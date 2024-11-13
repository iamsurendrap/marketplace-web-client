import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CategoryService } from '../category/category.service';
import * as CategoryActions from '../category/category.actions';

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map(response => CategoryActions.loadCategoriesSuccess({ categories: response.data })),
          catchError(error => of(CategoryActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
}