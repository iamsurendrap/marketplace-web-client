import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../store/authentication/auth.actions';
import * as AuthSelectors from '../../../store/authentication/auth.selectors';
import { User } from '../../../store/authentication/user.model';
import { AuthDialogService } from '../../../services/auth-dialog.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  displayDialog: boolean = false;
  isLoginView: boolean = true;
  user$: Observable<User | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  email: string = '';
  password: string = '';

  constructor(
    private store: Store,
    private authDialogService: AuthDialogService
  ) {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
  }

  ngOnInit() {
    this.authDialogService.openDialog$.subscribe(() => {
      this.openDialog();
    });
  }

  toggleAuthView() {
    this.isLoginView = !this.isLoginView;
  }

  openDialog() {
    this.displayDialog = true;
  }

  closeDialog() {
    this.isLoginView = true;
    this.displayDialog = false;
  }

  onLogin() {
    this.store.dispatch(AuthActions.login({ email: this.email, password: this.password }));
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}