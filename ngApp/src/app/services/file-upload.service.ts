import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private _uploadPostImageUrl = 'http://localhost:3000/api/post/uploadImage';
  private _uploadProfileImageUrl =
    'http://localhost:3000/api/authentification/uploadImage';
  constructor(private http: HttpClient) {}
  postImageUpload(formData: any) {
    return this.http.post<any>(this._uploadPostImageUrl, formData);
  }
  profileImageUpload(formData: any) {
    return this.http.post<any>(this._uploadProfileImageUrl, formData);
  }
}
