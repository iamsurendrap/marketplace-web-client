import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Listing } from './listing.model';
import { environment } from 'src/environments/environment';
import { Ad } from 'src/app/features/ads/models/ad.model';
import { map } from 'rxjs/operators';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createListing(listing: Listing, files: File[]): Observable<Listing> {
    console.log('ListingService.createListing called with:', { listing, files });
    const formData = new FormData();
    formData.append('listing', JSON.stringify(listing));
    files.forEach((file, index) => {
      if (file instanceof File) {
        formData.append('files', file, file.name);
      } else {
        console.error('Invalid file object:', file);
      }
    });
    return this.http.post<{success: boolean; status: number; message: string; data: Listing}>(`${this.apiUrl}/listing`, formData).pipe(
      map(response => response.data),
      tap(data => data),
      catchError(error => {
        console.error('API error:', error);
        throw error;
      })
    );
  }

}
