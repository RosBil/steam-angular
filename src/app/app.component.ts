import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  isLogin$$: Subscription;
  isAuthorized = false;
  title = 'steam-angular';

  mainPageLink = '/login';

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.isLogin$$ = this.authService.loginInfo$.subscribe((isLoggedIn: boolean) => {
      this.isAuthorized = isLoggedIn;

      this.mainPageLink = this.isAuthorized ? '/profile' : '/login';
    });
  }

  ngOnDestroy(): void {
    this.isLogin$$.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
