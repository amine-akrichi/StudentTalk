import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPostingDialogComponent } from '../components/user-posting-dialog/user-posting-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  loggedInUser: any;
  constructor(private dialog: MatDialog, private _router: Router) {}
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(
      sessionStorage.getItem('loggedInUser') || '{}'
    );
    console.log(this.loggedInUser.username);
  }
  openPostDialog() {
    const dialogRef = this.dialog.open(UserPostingDialogComponent, {
      panelClass: 'post-dialog',
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openProfile() {
    this._router.navigate(['/User/Profile']);
  }

  onLogout() {
    sessionStorage.clear();
    this._router.navigate(['/Login']);
  }
}
