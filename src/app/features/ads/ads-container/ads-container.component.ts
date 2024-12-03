import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ads-container',
  templateUrl: './ads-container.component.html',
  styleUrls: ['./ads-container.component.scss']
})
export class AdsContainerComponent implements OnInit, OnDestroy {
  showPostAd = false;
  subscription: Subscription;

  constructor(private sharedService: SharedService) {
    this.subscription = this.sharedService.postAdToggle$.subscribe(() => {
      this.togglePostAd();
    });
  }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  togglePostAd() {
    this.showPostAd = !this.showPostAd;
  }
}