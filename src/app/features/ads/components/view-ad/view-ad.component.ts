import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedAd, selectAdLoading, selectAdError } from '../../store/selectors/ad-item.selectors';
import { ActivatedRoute } from '@angular/router';
import { clearSelectedAd, loadAdById } from '../../store/actions/ad-item.actions';
import * as AuthSelectors from '../../../../store/authentication/auth.selectors';
import { trigger, transition, style, animate } from '@angular/animations';
import { User } from 'src/app/store/authentication/user.model';
import { Ad } from '../../models/ad.model';
import { Observable } from 'rxjs';
import { constants } from 'src/app/globalconstants/global-constants';
import { selectValueByKey } from 'src/app/store/globalvariables/key-value.selectors';

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
  user: User | null = null;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.store.select(AuthSelectors.selectUser).subscribe((user) => {
      this.user = user;
    });

    this.store.select(selectValueByKey(constants.AD_UPDATE)).subscribe((theme) => {
      console.log('Current theme:', theme);
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const adId = params.get('adId');
      if (adId) {
        this.store.dispatch(loadAdById({ id: adId }));
      }
    });
  }

  isOwner(user: User, ad:Ad): boolean {
    return user?._id === ad.owner;
  }

  canSendInterest(user: User, ad:Ad): boolean {
    return user?._id !== ad.owner;
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSelectedAd());
  }

}
