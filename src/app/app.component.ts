import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLogin$$: Subscription;
  isAuthorized = false;
  title = 'steam-angular';

  mainPageLink = '/login';

  constructor(
    private authService: AuthService,
    private viewport: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.isLogin$$ = this.authService.loginInfo$.subscribe(
      (isLoggedIn: boolean) => {
        this.isAuthorized = isLoggedIn;

        this.mainPageLink = this.isAuthorized ? '/profile' : '/login';
      }
    );
  }

  onTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }

  ngOnDestroy(): void {
    this.isLogin$$.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
