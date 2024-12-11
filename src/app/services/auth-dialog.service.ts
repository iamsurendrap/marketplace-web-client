import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  private openDialogSource = new BehaviorSubject<{ show: boolean; isLoginView: boolean }>({
    show: false,
    isLoginView: true,
  });
  openDialog$ = this.openDialogSource.asObservable();

  openDialog(isLoginView: boolean = true) {
    this.openDialogSource.next({ show: true, isLoginView });
  }

  closeDialog() {
    this.openDialogSource.next({ show: false, isLoginView: true });
  }
}
