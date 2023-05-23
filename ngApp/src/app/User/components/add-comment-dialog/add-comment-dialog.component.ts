import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css'],
})
export class AddCommentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    data.commentCreationDate = new Date();
  }
}
