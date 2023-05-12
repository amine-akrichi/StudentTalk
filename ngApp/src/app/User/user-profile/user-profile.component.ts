import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loggedInUser: any;
  constructor() {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(
      sessionStorage.getItem('loggedInUser') || '{}'
    );
    console.log(this.loggedInUser.username);
  }
}
