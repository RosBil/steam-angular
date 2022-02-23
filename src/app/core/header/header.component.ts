import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../services/local-storage.service";
import {LocalStorageKeys} from "../enums/local-storage-keys";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogin$$: Subscription;
  isAuthorized: boolean;

  mainPageLink = '/login';

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    public router: Router
  ) {
    this.isAuthorized = !!this.localStorageService.getParsedLocalStorageItem(LocalStorageKeys.loginInfo);
  }

  ngOnInit(): void {
    this.setMainPageLink();

    this.isLogin$$ = this.authService.loginInfo$.subscribe((isLoggedIn: boolean) => {
      this.isAuthorized = isLoggedIn;

      this.setMainPageLink();
    });
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
