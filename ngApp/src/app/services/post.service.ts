import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _addPostURL = 'http://localhost:3000/api/post/addPost';
  private _updatePostURL = 'http://localhost:3000/api/post/updatePost';
  private _deletePostURL = 'http://localhost:3000/api/post/deletePost';
  private _listPostsURL = 'http://localhost:3000/api/post/listPosts';
  private _listUserPostsUrl = 'http://localhost:3000/api/post/listUserPosts';

  constructor(private _http: HttpClient) {}

  listPosts() {
    return this._http.get<any>(this._listPostsURL);
  }

  listUserPosts(user: any) {
    return this._http.post(this._listUserPostsUrl, user);
  }

  addPost(post: any) {
    return this._http.post(this._addPostURL, post);
  }

  updatePost(post: any) {
    return this._http.post(this._updatePostURL, post);
  }

  deletePost(post: any) {
    return this._http.post(this._deletePostURL, post);
  }
}
