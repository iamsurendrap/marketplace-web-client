import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ad } from '../../models/ad.model';
import * as AdActions from '../../store/actions/ad.actions';
import * as fromAd from '../../store/selectors/ad.selectors';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss']
})
export class AdListComponent implements OnInit {
  ads$: Observable<Ad[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.ads$ = this.store.select(fromAd.selectAllAds);
    this.currentPage$ = this.store.select(fromAd.selectCurrentPage);
    this.totalPages$ = this.store.select(fromAd.selectTotalPages);
    this.loading$ = this.store.select(fromAd.selectAdsLoading);
    this.error$ = this.store.select(fromAd.selectAdsError);
  }

  ngOnInit() {
    this.loadAds();
  }

  loadAds(page: number = 1, limit: number = 5, category="") {
    this.store.dispatch(AdActions.loadAds({ page, limit, category }));
  }

  loadMore() {
    this.currentPage$.subscribe(currentPage => {
      this.loadAds(currentPage + 1);
    }).unsubscribe();
  }
}