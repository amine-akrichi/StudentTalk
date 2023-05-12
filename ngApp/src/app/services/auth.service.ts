import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _login_url = 'http://localhost:3000/api/authentification/login';
  private _register_url = 'http://localhost:3000/api/authentification/register';

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post<any>(this._login_url, user);
  }

  register(user: any) {
    return this.http.post<any>(this._register_url, user);
  }

  loggedIn() {
    return !!sessionStorage.getItem('loggedInUser');
  }

  isAdmin() {
    return (
      JSON.parse(sessionStorage.getItem('loggedInUser') || '{}').username ==
      'admin2023'
    );
  }
}
