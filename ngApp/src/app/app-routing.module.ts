import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { UserHomepageComponent } from './User/user-homepage/user-homepage.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { UserSidebarComponent } from './User/user-sidebar/user-sidebar.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },
  {
    path: 'User',
    canActivate: [AuthGuard],
    component: UserSidebarComponent,
    children: [
      {
        path: 'Homepage',
        component: UserHomepageComponent,
      },
      {
        path: 'Profile',
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
