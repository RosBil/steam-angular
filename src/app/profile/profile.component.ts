import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../core/login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo: any = window.localStorage.getItem('loginInfo');
  userEmail = JSON.parse(this.userInfo).user.email

  constructor() { }

  ngOnInit(): void {
  }

}
