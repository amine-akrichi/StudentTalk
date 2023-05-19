import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCommentsDialogComponent } from '../components/user-comments-dialog/user-comments-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserProfileDialogComponent } from '../components/update-user-profile-dialog/update-user-profile-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loggedInUser: any;
  postsList: any;
  mergedPostUserList: any[] = [];
  constructor(
    private dialog: MatDialog,
    private _postService: PostService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.storeLoggedUser();
    this._postService.listUserPosts(this.loggedInUser).subscribe(
      (res) => {
        this.postsList = res;
        this.joinUserPosts();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  joinUserPosts() {
    this.postsList.forEach((post: any, user: any) => {
      user = this.loggedInUser;
      this.mergedPostUserList.push({ post, user });
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
  openPostComments() {
    const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
      panelClass: 'post-dialog',
      width: '65vw',
      height: '90vh',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  onLogout() {
    sessionStorage.clear();
    this._router.navigate(['/Login']);
  }
}
