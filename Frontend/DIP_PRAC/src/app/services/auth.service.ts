import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ISignUp} from "../models/signup"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly demoUrl = 'http://localhost:8080/auth';
  // noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };
  constructor(private _http: HttpClient) {}

  Login(auth: any) {
    return this._http.post(this.demoUrl+"/login", auth);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setRole(Role: any) {
    localStorage.setItem('Role', Role);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getRole() {
    return localStorage.getItem('Role');
  }

  deleteToken() {
    localStorage.removeItem('Role');
    return localStorage.removeItem('token');

  }
  isLoggedIn() {
    const token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }
  // function 'getUserPayload' returns the token
  getUserPayload() {
    const token = this.getToken();
    return token;
  }
  PostUser(user: ISignUp): Observable<ISignUp> {
    return this._http.post<ISignUp>(this.demoUrl+"/signin", user);
  }

}