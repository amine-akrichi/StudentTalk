import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserCommentsDialogComponent } from '../components/user-comments-dialog/user-comments-dialog.component';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css'],
})
export class UserHomepageComponent implements OnInit {
  loggedInUser: any;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(
      sessionStorage.getItem('loggedInUser') || '{}'
    );
    console.log(this.loggedInUser.username);
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
