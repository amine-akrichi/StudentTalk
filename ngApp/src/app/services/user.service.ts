import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _findUserWithPostURL =
    'http://localhost:3000/api/user/findUserWithPost';
  private _uploadProfileImageUrl = 'http://localhost:3000/api/user/uploadImage';
  private _updateUserUrl = 'http://localhost:3000/api/user/updateUser';
  private _findUserWithCommentUrl =
    'http://localhost:3000/api/user/findUserWithComment';

  constructor(private http: HttpClient) {}

  profileImageUpload(formData: any) {
    return this.http.post<any>(this._uploadProfileImageUrl, formData);
  }
  findUserWithPost(post: any) {
    return this.http.post<any>(this._findUserWithPostURL, post);
  }
  findUserWithComment(comment: any) {
    return this.http.post<any>(this._findUserWithCommentUrl, comment);
  }
  updateUser(user: any) {
    return this.http.post<any>(this._updateUserUrl, user);
  }
}
