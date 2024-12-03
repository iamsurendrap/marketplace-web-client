import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as AuthSelectors  from '../app/store/authentication/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store); // Inject the NgRx store
  const router = inject(Router); // Inject the router

  return store.select(AuthSelectors.selectUser).pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        if (state.url === '/post-ad') {
          router.navigate(['']);
        }
        return false;
      }
    })
  );
};
