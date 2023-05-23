import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _addCommentURL = 'http://localhost:3000/api/comment/addComment';
  private _updateCommentURL = 'http://localhost:3000/api/comment/updateComment';
  private _deleteCommentURL = 'http://localhost:3000/api/comment/deleteComment';
  private _listPostCommentsURL =
    'http://localhost:3000/api/comment/listPostComments';
  constructor(private _http: HttpClient) {}

  addComment(comment: any) {
    return this._http.post(this._addCommentURL, comment);
  }

  updateComment(comment: any) {
    return this._http.post(this._updateCommentURL, comment);
  }

  deleteComment(comment: any) {
    return this._http.post(this._deleteCommentURL, comment);
  }

  listPostComments(post: any) {
    return this._http.post<any[]>(this._listPostCommentsURL, post);
  }
}
