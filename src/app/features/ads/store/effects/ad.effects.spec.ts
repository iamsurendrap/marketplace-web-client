import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AdEffects } from './ad.effects';

describe('AdEffects', () => {
  let actions$: Observable<any>;
  let effects: AdEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AdEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
