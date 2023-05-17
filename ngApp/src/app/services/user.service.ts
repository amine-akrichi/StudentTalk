import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _findUserWithPostURL =
    'http://localhost:3000/api/user/findUserWithPost';

  constructor(private http: HttpClient) {}

  findUserWithPost(user: any) {
    return this.http.post(this._findUserWithPostURL, user);
  }
}
