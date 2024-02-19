import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeniusService {
  private baseUrl: string = 'https://api.genius.com';
  private accessToken: string = '3SCcOZsupTXv1ypo24khNLnBMwLh5N28Om9zUxl7olcIetQ2kPiXYqhUREyr5VF-';

  constructor(private http: HttpClient) {}

  searchSong(query: string): Observable<any> {
    const url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}&access_token=${this.accessToken}`;
    return this.http.get(url);
  }
}
