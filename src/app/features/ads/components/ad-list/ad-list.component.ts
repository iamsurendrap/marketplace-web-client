import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Ad } from '../../models/ad.model';
import * as AdActions from '../../store/actions/ad.actions';
import * as fromAd from '../../store/selectors/ad.selectors';
import { Category } from '../../../../store/category/category.model';
import * as fromCategory from '../../../../store/category/category.selectors';
import * as categoryActions from '../../../../store/category/category.actions';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';


type CategoryOption = Category | { _id: 'all'; name: 'All' }
@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
  animations: [
    trigger('tileAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AdListComponent implements OnInit {
  ads$: Observable<Ad[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  categories$: Observable<Category[]>
  categoriesWithAll$: Observable<CategoryOption[]>;
  pageLimit: number;
  showingFavorites: boolean = false;
  showingUserListings: boolean = false;
  showingListings: boolean = false;
  currentRoute: string = "";

  constructor(private store: Store, private route: ActivatedRoute) {

    this.store.dispatch(AdActions.clearAdsList());
    this.pageLimit = 8;

    this.ads$ = this.store.select(fromAd.selectAllAds);
    this.currentPage$ = this.store.select(fromAd.selectCurrentPage);
    this.totalPages$ = this.store.select(fromAd.selectTotalPages);
    this.loading$ = this.store.select(fromAd.selectAdsLoading);
    this.error$ = this.store.select(fromAd.selectAdsError);
    this.categories$ = this.store.select(fromCategory.selectAllCategories);
    this.categoriesWithAll$ = this.categories$.pipe(
      map(categories => [
        { _id: 'all', name: 'All' } as CategoryOption,
        ...categories
      ])
    );
  }

  ngOnInit() {


    this.route.paramMap.subscribe((params) => {
      const userId = params.get('userId');
      if (userId) {
        this.route.url.subscribe(urlSegments => {
          this.currentRoute = urlSegments.map(segment => segment.path).join('/');
          this.handleRouteLogic( userId);
        });
      } else {
        this.showingListings = true;
        this.loadAds();
      }
    });
    this.store.dispatch(categoryActions.loadCategories());
  }

  handleRouteLogic(userId: string) {
    switch (this.currentRoute) {
      case `favorites/${userId}`:
        this.showingFavorites = true;
        this.loadFavorites(1, this.pageLimit, "", userId);
        break;
      case `userlistings/${userId}`:
        this.showingUserListings = true;
        this.loadUserAds(1, this.pageLimit, "", userId);
        break;
      default:
        console.log('Unknown route');
    }
  }

  loadAds(page: number = 1, limit: number = this.pageLimit, category = "") {
    this.store.dispatch(AdActions.loadAds({ page, limit, category }));
  }

  loadFavorites(page: number = 1, limit: number = this.pageLimit, category = "", userId: string) {
    this.store.dispatch(AdActions.loadFavourites({ page, limit, category, userId}));
  }

  loadUserAds(page: number = 1, limit: number = this.pageLimit, category = "", userId: string) {
    this.store.dispatch(AdActions.loadUserListings({ page, limit, category, userId}));
  }

  loadMore() {
    this.currentPage$.pipe(take(1)).subscribe(currentPage => {
      this.loadAds(currentPage + 1);

    });
  }

  trackById(index: number, item: any) {
    return item.id; // Use a unique identifier for each item
  }

  onCardClick(ad: any) {
    console.log('Card clicked:', ad);
  }

  onHeartClick(ad: any) {
    console.log('Heart clicked:', ad);
  }
  onCategoryChange(event: any) {
    let selectedValue = event.value;
    if (selectedValue === 'All') {
      selectedValue = "";
    }
    this.loadAds(1, this.pageLimit, selectedValue);
  }

}
