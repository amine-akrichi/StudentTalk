import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-post-dialog',
  templateUrl: './update-post-dialog.component.html',
  styleUrls: ['./update-post-dialog.component.css'],
})
export class UpdatePostDialogComponent {
  file: any;
  images: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
