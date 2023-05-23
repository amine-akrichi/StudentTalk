import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPostingDialogComponent } from '../components/user-posting-dialog/user-posting-dialog.component';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserHomepageComponent } from '../user-homepage/user-homepage.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  loggedInUser: any;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  @ViewChild(UserHomepageComponent)
  homepageComponent!: UserHomepageComponent;
  constructor(
    private dialog: MatDialog,
    private _router: Router,
    private _postService: PostService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(
      sessionStorage.getItem('loggedInUser') || '{}'
    );
    console.log(this.loggedInUser.username);
  }
  openPostDialog() {
    const dialogRef = this.dialog.open(UserPostingDialogComponent, {
      panelClass: 'post-dialog',
      width: '55vw',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        this._postService.addPost(result).subscribe(
          (res) => {
            console.log(res);
            let currentURL = this._router.url;
            this._router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this._router.navigate([currentURL]);
              });
            this._snackBar.open('Post Added', 'OK', {
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

  openProfile() {
    this._router.navigate(['/User/Profile']);
  }
}
