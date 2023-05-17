import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
//Form imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSidebarComponent } from './User/user-sidebar/user-sidebar.component';
import { UserHomepageComponent } from './User/user-homepage/user-homepage.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { UserPostingDialogComponent } from './User/components/user-posting-dialog/user-posting-dialog.component';
import { UserCommentsDialogComponent } from './User/components/user-comments-dialog/user-comments-dialog.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    UserSidebarComponent,
    UserHomepageComponent,
    UserProfileComponent,
    LoginComponent,
    SignupComponent,
    UserPostingDialogComponent,
    UserCommentsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [AuthService, UserService, PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
