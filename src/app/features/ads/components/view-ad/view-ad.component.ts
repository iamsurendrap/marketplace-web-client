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
import { MessageService } from 'primeng/api';
import { removeKeyValue } from 'src/app/store/globalvariables/key-value.actions';

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

  constructor(private store: Store, private route: ActivatedRoute, private messageService: MessageService) {
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
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ad updated successfully!',
          life: 3000,
        });
        // Clear the key after showing the toast
        this.store.dispatch(removeKeyValue({ key: constants.AD_UPDATE }));
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
