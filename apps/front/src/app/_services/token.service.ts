import { Injectable } from '@angular/core';
import {  jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';

const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private authService: AuthService) { }
  public saveToken(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getToken(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  getCurrentDetail(detail: string): any {
    const payload = this.decodeToken(this.getToken().access_token);
    return payload[detail];
  }
  decodeToken(token: string): any {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}