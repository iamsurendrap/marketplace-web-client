import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedAd, selectAdLoading, selectAdError } from '../../store/selectors/ad-item.selectors';
import { ActivatedRoute } from '@angular/router';
import { clearSelectedAd, loadAdById } from '../../store/actions/ad-item.actions';
import * as AuthSelectors from '../../../../store/authentication/auth.selectors';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-view-ad',
  templateUrl: './view-ad.component.html',
  styleUrl: './view-ad.component.scss',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1200ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ViewAdComponent implements OnInit {

  ad$ = this.store.select(selectSelectedAd);
  loading$ = this.store.select(selectAdLoading);
  error$ = this.store.select(selectAdError);
  user$: any;

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.route.paramMap.subscribe((params) => {
      const adId = params.get('adId');
      if (adId) {
        this.store.dispatch(loadAdById({ id: adId }));
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSelectedAd());
  }

}
