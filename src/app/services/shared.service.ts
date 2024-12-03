import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private postAdToggleSource = new Subject<void>();

  postAdToggle$ = this.postAdToggleSource.asObservable();

  togglePostAd() {
    this.postAdToggleSource.next();
  }
}