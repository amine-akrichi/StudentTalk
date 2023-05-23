import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}
  private _addLikeURL = 'http://localhost:3000/api/like/addLike';
  private _deleteLikeURL = 'http://localhost:3000/api/like/deleteLike';
  private _listPostLikesURL = 'http://localhost:3000/api/like/listPostLikes';

  addLike(like: any) {
    return this.http.post<any>(this._addLikeURL, like);
  }
  deleteLike(like: any) {
    return this.http.post<any>(this._deleteLikeURL, like);
  }
  listPostLikes(post: any) {
    return this.http.post<any>(this._listPostLikesURL, post);
  }
}
