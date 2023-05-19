import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user-profile-dialog',
  templateUrl: './update-user-profile-dialog.component.html',
  styleUrls: ['./update-user-profile-dialog.component.css'],
})
export class UpdateUserProfileDialogComponent {
  hide = true;
  file: any;
  images: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService
  ) {}
  uploadImage() {
    const formData = new FormData();
    formData.append('profileImage', this.images);
    this._userService.profileImageUpload(formData).subscribe(
      (res) => {
        this.data.user.profileImageUrl =
          'http://localhost:3000/src/uploads/profileImages/' + res.originalname;
      },

      (err) => console.log(err)
    );
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.images = this.file;
      this.uploadImage();
    }
  }

  removeImage() {
    this.data.user.profileImageUrl =
      'http://localhost:3000/src/uploads/profileImages/profile_placeholder.png';
  }
}
