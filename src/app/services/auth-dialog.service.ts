import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  private openDialogSource = new BehaviorSubject<boolean>(false);
  openDialog$ = this.openDialogSource.asObservable();

  openDialog() {
    this.openDialogSource.next(true);
  }


  closeDialog() {
    this.openDialogSource.next(false);
  }
}