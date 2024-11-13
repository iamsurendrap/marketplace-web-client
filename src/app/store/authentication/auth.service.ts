import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../authentication/user.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ status: number; message: string; data: User }> {
    return this.http.post<{ status: number; message: string; data: User }>(`${this.apiUrl}/auth/login`, { email, password });
  }
}