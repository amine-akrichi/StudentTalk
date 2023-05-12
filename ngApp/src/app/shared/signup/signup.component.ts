import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hide = true;
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  isAdmin() {
    if (this._authService.isAdmin()) {
      //this._router.navigate(['/Admin/Homepage']);
      console.log('admin');
    } else {
      console.log('user');
      this._router.navigate(['/User/Homepage']);
    }
  }

  onSignup() {
    if (
      !this.signupForm.get('username')?.errors &&
      !this.signupForm.get('password')?.errors &&
      !this.signupForm.get('email')?.errors
    ) {
      this._authService.register(this.signupForm.value).subscribe(
        (res) => {
          console.log(res);
          sessionStorage.setItem('loggedInUser', JSON.stringify(res));
          this.isAdmin();
        },
        (err) => {
          let errorStatus = err.status;
          let errorMessage = 'Registration Failed';
          console.log(err);
          if (errorStatus == 401) {
            errorMessage = 'Username already exists';
          }
          this._snackBar.open(errorMessage, 'ok', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      );
    }
  }
}
