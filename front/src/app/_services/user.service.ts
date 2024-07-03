import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HashPasswordService } from './hash-password.service';
import { RoleServiceService } from './role-service.service';
import { Role } from '../_models/role.module';
import { USER_ENDPOINT } from '../api-urls';

const API_URL = 'http://localhost:8080/api/test/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private hashService:HashPasswordService, private roleService: RoleServiceService) {}

private apiUrl = USER_ENDPOINT;

  register(username: string, passwordHash:string, email:string, role:Role): Observable<any> {
    debugger
    passwordHash=this.hashService.encryptPassword(passwordHash)
    const newUser = {
      "userName": username,
      "passwordHash": passwordHash,
      "role": role,
      "email": email
    }
    return this.http.put(
      this.apiUrl+"/create",
      newUser,
      httpOptions
    );
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllUsers():Observable<any>{
    return this.http.get(this.apiUrl +'/findAll')
  }

  changPassword(newPassword:string): Observable<any> {
    const token = JSON.parse(sessionStorage.getItem('auth-user')+'')?.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const body = { newPassword: this.hashService.encryptPassword(newPassword) };
    return this.http.put<any>(this.apiUrl+'changePassword', body, { headers })
  }
}
