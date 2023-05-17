import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserCommentsDialogComponent } from '../components/user-comments-dialog/user-comments-dialog.component';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css'],
})
export class UserHomepageComponent implements OnInit {
  loggedInUser: any;
  postsList: any[] = [];
  mergedPostUserList: any[] = [];
  constructor(
    private dialog: MatDialog,
    private _postService: PostService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.storeLoggedUser();
    this._postService.listPosts().subscribe(
      (res) => {
        this.postsList = res;
        this.postsList.reverse();
        console.log(this.postsList);

        this.joinUserPosts();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  joinUserPosts() {
    this.postsList.forEach((post: any) => {
      this._userService.findUserWithPost(post).subscribe(
        (user) => {
          this.mergedPostUserList.push({ post, user });
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
}
