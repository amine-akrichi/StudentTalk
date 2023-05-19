import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-user-posting-dialog',
  templateUrl: './user-posting-dialog.component.html',
  styleUrls: ['./user-posting-dialog.component.css'],
})
export class UserPostingDialogComponent {
  file: any;
  images: any;
  hiddenBar: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fileUploadService: FileUploadService
  ) {
    data.userId = JSON.parse(
      sessionStorage.getItem('loggedInUser') || '{}'
    )._id;
    data.postCreationDate = new Date();
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('Postimage', this.images);
    this._fileUploadService.postImageUpload(formData).subscribe(
      (res) => {
        this.data.postImageUrl =
          'http://localhost:3000/src/uploads/images/' + res.originalname;
        //this.hiddenBar = true;
      },
      (err) => console.log(err)
    );
  }
  selectImage(event: any) {
    //this.hiddenBar = false;
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.images = this.file;
      this.uploadImage();
    }
  }
}
