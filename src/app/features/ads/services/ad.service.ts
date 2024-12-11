// src/app/features/ads/services/ad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Ad, AdResponse } from '../models/ad.model';
import { environment } from 'src/environments/environment';

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

  getAdById(id: string): Observable<Ad> {
    return this.http.get<{success: boolean; status: number; message: string; data: Ad}>(`${this.apiUrl}/listing/${id}`).pipe(
      map((response) => response.data)
    );
  }

  updateAd(listing: any): Observable<any> {
    const formData = new FormData();

    console.log(listing);
    // Add listing data
    formData.append(
      'listing',
      JSON.stringify({
        _id: listing._id,
        title: listing.title,
        description: listing.description,
        category: listing.category,
        price: listing.price,
        imageURLs: listing.imageURLs, // Existing image URLs
      })
    );

  console.log('newFiles:', listing.newFiles);

    // Add new files only if valid
    if (listing.newFiles && listing.newFiles.length > 0) {
      listing.newFiles.forEach((file: File) => {
        if (file instanceof File) {
          formData.append('files', file, file.name);
        } else {
          console.warn('Skipping invalid file:', file);
        }
      });
    }

    return this.http.put(`${this.apiUrl}/listing/${listing._id}`, formData);
  }

  sendInterest(adId: string, userId: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(
      `${this.apiUrl}/listing/sendmessage/${adId}/${userId}`
    );
  }

}
