// src/app/features/ads/services/ad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdResponse } from '../models/ad.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAds(page: number, limit: number, category: string): Observable<AdResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('category', category);

    return this.http.get<AdResponse>(`${this.apiUrl}/listing`, { params });
  }

}