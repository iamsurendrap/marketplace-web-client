import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedAd, selectAdLoading, selectAdError } from '../../store/selectors/ad-item.selectors';
import { ActivatedRoute } from '@angular/router';
import { clearSelectedAd, loadAdById, updateAd } from '../../store/actions/ad-item.actions';
import * as AuthSelectors from '../../../../store/authentication/auth.selectors';
import { trigger, transition, style, animate } from '@angular/animations';
import { User } from 'src/app/store/authentication/user.model';
import { Ad } from '../../models/ad.model';
import { Observable } from 'rxjs';
import { constants } from 'src/app/globalconstants/global-constants';
import { selectValueByKey } from 'src/app/store/globalvariables/key-value.selectors';
import { MessageService } from 'primeng/api';
import { removeKeyValue } from 'src/app/store/globalvariables/key-value.actions';
import { AdService } from '../../services/ad.service';
import { Listing } from 'src/app/store/post-ad/listing.model';

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
  showUpdateMessage : boolean = false;
  isInterestSent : boolean = false;

  constructor(private store: Store, private route: ActivatedRoute, private messageService: MessageService, private adService :AdService) {
    this.store.select(AuthSelectors.selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const adId = params.get('adId');
      if (adId) {
        this.store.dispatch(loadAdById({ id: adId }));
      }
    });

    this.store.select(selectValueByKey(constants.AD_UPDATE)).subscribe((value) => {
      if (value === 'updated') {
        this.showUpdateMessage = true;
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
    this.store.dispatch(removeKeyValue({ key: constants.AD_UPDATE }));
  }

  onSendInterest(user: User | null, ad: Listing) {
    if (!user) {
      console.log('User is not logged in.');
      return;
    }

    this.adService.sendInterest(ad._id, user._id).subscribe({
      next: (response) => {
        this.isInterestSent = true;
      },
      error: (error) => {
        console.error('Error sending interest:', error);
      },
    });
  }

  alreadyShownInterest(user: User, ad:Ad){
    if (!user || !user.favorites) {
      return false;
    }
    return user.favorites.includes(ad._id);
  }
}
