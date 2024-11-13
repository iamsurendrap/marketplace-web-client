import { Component, ViewChild} from '@angular/core';
import { AuthDialogService } from '../../../services/auth-dialog.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/authentication/user.model';
import * as AuthSelectors from '../../../store/authentication/auth.selectors';
import * as AuthActions from '../../../store/authentication/auth.actions';
import { Store } from '@ngrx/store';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

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

  constructor(private store: Store, private authDialogService: AuthDialogService){
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);

  }

  toggleMenu() {
    this.displayMenu = !this.displayMenu;
  }

  onLoginClick() {
    this.authDialogService.openDialog();
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

}