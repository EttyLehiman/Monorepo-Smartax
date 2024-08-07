import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api-urls';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}
  private apiUrl = API_URL;
  
  // דוגמה לפונקציה שמבצעת קריאת GET
  getItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/items`);
  }

  // דוגמה לפונקציה שמבצעת קריאת POST
  addItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/items`, item);
  }
}

