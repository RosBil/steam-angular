import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription}  from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { Router } from "@angular/router";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLogin$$: Subscription;
  isAuthorized = !!window.localStorage.getItem('loginInfo');
  title = 'steam-angular';

  mainPageLink = '/login';

  constructor(
    private authService: AuthService,
    private viewport: ViewportScroller,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.setMainPageLink();

    this.isLogin$$ = this.authService.loginInfo$.subscribe((isLoggedIn: boolean) => {
      this.isAuthorized = isLoggedIn;

      this.setMainPageLink();
    });

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     window.localStorage.clear();
    //   }
    // });
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

  private setMainPageLink() {
    this.mainPageLink = this.isAuthorized ? '/games' : '/login';
  }

}
