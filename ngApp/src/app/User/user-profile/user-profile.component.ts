import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserProfileDialogComponent } from '../components/update-user-profile-dialog/update-user-profile-dialog.component';
import { UpdateCommentDialogComponent } from '../components/update-comment-dialog/update-comment-dialog.component';
import { AddCommentDialogComponent } from '../components/add-comment-dialog/add-comment-dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loggedInUser: any;
  postsList: any[] = [];
  mergedPostUserList: any[] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(
    private dialog: MatDialog,
    private _postService: PostService,
    private _userService: UserService,
    private _likeService: LikeService,
    private _commentService: CommentService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.storeLoggedUser();
    this._postService.listPosts().subscribe(
      (res) => {
        this.postsList = res;
        this.postsList.reverse();
        this.mergedPostUserList = [];
        this.joinPostTables();
        console.log(this.mergedPostUserList);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  joinPostTables() {
    this.postsList.forEach((post: any) => {
      this._userService.findUserWithPost(post).subscribe(
        (user) => {
          this._likeService.listPostLikes(post).subscribe(
            (likes) => {
              this._commentService.listPostComments(post).subscribe(
                (comments) => {
                  if (comments.length > 0) {
                    const commentObservables = comments.map((comment) =>
                      this._userService.findUserWithComment(comment)
                    );

                    forkJoin(commentObservables).subscribe(
                      (commentUserList) => {
                        this.mergedPostUserList.push({
                          post,
                          user,
                          likes,
                          comments: comments.map((comment, index) => ({
                            comment,
                            commentUser: commentUserList[index],
                          })),
                        });
                      },
                      (err) => {
                        console.log(err);
                      }
                    );
                  } else {
                    this.mergedPostUserList.push({
                      post,
                      user,
                      likes,
                      comments: null,
                    });
                  }
                },
                (err) => {
                  console.log(err);
                }
              );
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  makeUserfromID(id: any) {
    return '{_id: "' + id + '"}';
  }

  storeLoggedUser() {
    this.loggedInUser = JSON.parse(
      sessionStorage.getItem('loggedInUser') || '{}'
    );
  }

  openProfileDialog() {
    const dialogRef = this.dialog.open(UpdateUserProfileDialogComponent, {
      panelClass: 'post-dialog',
      width: '40vw',
      data: { user: this.loggedInUser },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._userService.updateUser(result).subscribe(
          (res) => {
            console.log(res);
            sessionStorage.setItem('loggedInUser', JSON.stringify(res));
            let currentURL = this._router.url;
            this._router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this._router.navigate([currentURL]);
              });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  addComment(post: any) {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      data: {
        userId: this.loggedInUser._id,
        postId: post._id,
      },
      panelClass: 'post-dialog',
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._commentService.addComment(result).subscribe(
          (res) => {
            console.log(res);
            this.ngOnInit();
            this._snackBar.open('Comment Added', 'OK', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: 'custom-snackbar',
            });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  updateComment(comment: any) {
    const dialogRef = this.dialog.open(UpdateCommentDialogComponent, {
      data: {
        comment: comment,
      },
      panelClass: 'post-dialog',
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._commentService.updateComment(result).subscribe(
          (res) => {
            console.log(res);
            this.ngOnInit();
            this._snackBar.open('Comment Updated', 'OK', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: 'custom-snackbar',
            });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  deleteComment(comment: any) {
    this._commentService.deleteComment(comment).subscribe((res) => {
      this.ngOnInit();
      this._snackBar.open('Comment Deleted', 'OK', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: 'custom-snackbar',
      });
      console.log(res);
    });
  }
  deletePost(post: any) {
    this._postService.deletePost(post).subscribe(
      (res) => {
        this._snackBar.open('Post Deleted', 'OK', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: 'custom-snackbar',
        });
        this.ngOnInit();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onLogout() {
    sessionStorage.clear();
    this._router.navigate(['/Login']);
  }
}
