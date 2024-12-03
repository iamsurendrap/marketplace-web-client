import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthDialogComponent } from './shared/components/auth-dialog/auth-dialog.component';
import { AuthDialogService } from './services/auth-dialog.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../app/store/authentication/auth.actions';
import * as PostAdActions from '../app/store/post-ad/post-ad.actions';
import * as categoryActions from '../app/store/category/category.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  showLoginDialog$: Observable<boolean>;
  showPostAd = false;

  constructor(
    private authDialogService: AuthDialogService,
    private store: Store,
  ) {
    this.showLoginDialog$ = this.authDialogService.openDialog$;
  }
  ngOnInit() {
    const savedState = localStorage.getItem('appState');
  if (savedState) {
    this.store.dispatch(AuthActions.loadSavedState({ state: JSON.parse(savedState) }));
  }
    this.store.dispatch(categoryActions.loadCategories());
  }

  togglePostAd() {
    this.showPostAd = !this.showPostAd;
  }

  closeLoginDialog() {
    this.authDialogService.closeDialog();
  }
}
