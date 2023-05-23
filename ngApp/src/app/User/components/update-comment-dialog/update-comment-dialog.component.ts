import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-comment-dialog',
  templateUrl: './update-comment-dialog.component.html',
  styleUrls: ['./update-comment-dialog.component.css'],
})
export class UpdateCommentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
