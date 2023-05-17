import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-posting-dialog',
  templateUrl: './user-posting-dialog.component.html',
  styleUrls: ['./user-posting-dialog.component.css'],
})
export class UserPostingDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    data.userId = JSON.parse(
      sessionStorage.getItem('loggedInUser') || '{}'
    )._id;
    data.postCreationDate = new Date();
  }
}
