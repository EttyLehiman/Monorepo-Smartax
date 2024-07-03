import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HashPasswordService } from '../_services/hash-password.service';
import { AUTH_ENDPOINT } from '../api-urls';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private hashSevice: HashPasswordService, private hash: HashPasswordService) { }

  private apiUrl = AUTH_ENDPOINT;

  login(email: string, passwordHash: string): Observable<any> {
    passwordHash = this.hashSevice.encryptPassword(passwordHash)
    return this.http.post(
      this.apiUrl + '/signin',
      {
        email,
        passwordHash
      },
      httpOptions
    );
  }


  logout(): Observable<any> {
    return this.http.post(this.apiUrl + '/signout', {}, httpOptions);
  }


   getCurrentRole(): Observable<number> {
    const token = JSON.parse(sessionStorage.getItem('auth-user') + '')?.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get<number>(this.apiUrl + '/current-role', { headers }).pipe(
      map(role => role),
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(10);
      })
    );

  }


  checkTokenAndPolicyValidity(policy: number): Observable<boolean> {
    const token = JSON.parse(sessionStorage.getItem('auth-user') + '')?.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const body = { policy };

    return this.http.post<any>(this.apiUrl + '/validate-token', body, { headers }).pipe(
      // map(response => {
      //   if (response.message !== 'Token is valid and policy is valid') {
      //     return false;
      //   }

      //   return true;
      // })
    );
  }
}
