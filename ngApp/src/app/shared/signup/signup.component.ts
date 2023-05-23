import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  file: any;
  images: any;
  imageUrl =
    'http://localhost:3000/src/uploads/profileImages/profile_placeholder.png';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hide = true;
  signupForm = new FormGroup({
    profileImageUrl: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _fileUploadService: FileUploadService
  ) {}

  ngOnInit() {
    this.setProfileImageUrl(
      'http://localhost:3000/src/uploads/profileImages/profile_placeholder.png'
    );
  }
  setProfileImageUrl(imageUrl: string) {
    this.signupForm.setValue({
      profileImageUrl: imageUrl,
      username: this.signupForm.get('username')!.value,
      password: this.signupForm.get('password')!.value,
      name: this.signupForm.get('name')!.value,
      lastname: this.signupForm.get('lastname')!.value,
      email: this.signupForm.get('email')!.value,
    });
  }

  isAdmin() {
    if (this._authService.isAdmin()) {
      //this._router.navigate(['/Admin/Homepage']);
      console.log('admin');
    } else {
      console.log('user');
      this._router.navigate(['/User/Homepage']);
    }
  }

  removeImage() {
    this.setProfileImageUrl(
      'http://localhost:3000/src/uploads/profileImages/profile_placeholder.png'
    );
  }
  uploadImage() {
    const formData = new FormData();
    formData.append('profileImage', this.images);
    this._fileUploadService.profileImageUpload(formData).subscribe(
      (res) => {
        this.setProfileImageUrl(
          'http://localhost:3000/src/uploads/profileImages/' + res.originalname
        );
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

  onSignup() {
    if (
      !this.signupForm.get('username')?.errors &&
      !this.signupForm.get('password')?.errors &&
      !this.signupForm.get('email')?.errors
    ) {
      console.log(this.signupForm.value);
      this._authService.register(this.signupForm.value).subscribe(
        (res) => {
          console.log(res);
          sessionStorage.setItem('loggedInUser', JSON.stringify(res));
          this.isAdmin();
        },
        (err) => {
          this._snackBar.open('⛔  ' + err.error, 'OK', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: 'custom-snackbar',
          });
        }
      );
    }
  }
}
