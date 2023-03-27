import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//Angular Material imports
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

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

@NgModule({
  declarations: [
    AppComponent,
    UserSidebarComponent,
    UserHomepageComponent,
    UserProfileComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule, 
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
