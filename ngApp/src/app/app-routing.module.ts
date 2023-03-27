import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { UserHomepageComponent } from './User/user-homepage/user-homepage.component';
import { UserSidebarComponent } from './User/user-sidebar/user-sidebar.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'Homepage',
    pathMatch:'full'
  },
  {
    path:'',
    component:UserSidebarComponent,
    children:[
      {
        path:'Homepage',
        component:UserHomepageComponent
      }
    ]
  },
  {
    path:'Login',
    component:LoginComponent
  },
  {
    path:'Signup',
    component:SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
