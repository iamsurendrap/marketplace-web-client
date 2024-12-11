import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AuthDialogService } from '../../../services/auth-dialog.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/authentication/user.model';
import * as AuthSelectors from '../../../store/authentication/auth.selectors';
import * as AuthActions from '../../../store/authentication/auth.actions';
import { Store } from '@ngrx/store';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  @ViewChild('menu') menu!: Menu;

  displayMenu: boolean = false;
  userMenuItems: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-power-off',
      command: () => this.onLogout()
    }
  ];

  user$: Observable<User | null>
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private authDialogService: AuthDialogService, private sharedService: SharedService, private router: Router) {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);

  }

  toggleMenu() {
    this.displayMenu = !this.displayMenu;
  }

  onPostAdClick() {
    this.sharedService.togglePostAd();
  }

  onLoginClick() {
    this.authDialogService.openDialog(true);
  }


  onRegisterClick() {
    this.authDialogService.openDialog(false);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['']);
  }

}
