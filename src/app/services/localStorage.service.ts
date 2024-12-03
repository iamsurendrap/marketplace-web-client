import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private currentUser: any; // Store user information here

//Helper methods
  setCurrentUser(user: any, userid: any) {
    // Store the user information in currentUser
    this.currentUser = user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem('user_id',userid);
  }

  resetCurrentUser() {
    this.currentUser = null;
    localStorage.removeItem("user")
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem("user");
    return this.currentUser;
  }

  isLoggedIn(){
    return !!localStorage.getItem('user_id');
  }
}
