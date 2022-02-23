import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireDatabase} from '@angular/fire/compat/database';

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {LoginData} from "../../shared/interfaces/login-data.interface";

import {LocalStorageService} from "./local-storage.service";
import {LocalStorageKeys} from "../enums/local-storage-keys";
import {UserDataInfo} from "../models/user-data-info";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {CurrentUserInfo} from "../models/current-user-info";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginInfo$: BehaviorSubject<boolean>;

  private isLoggedIn: boolean;
  private usersExtendedData: Array<Partial<CurrentUserInfo>> = [];

  constructor(
    private fireAuth: AngularFireAuth,
    private dataBase: AngularFireDatabase,
    private localStorageService: LocalStorageService
  ) {
    this.isLoggedIn = !!this.localStorageService.getParsedLocalStorageItem(LocalStorageKeys.loginInfo);

    this.loginInfo$ = new BehaviorSubject<boolean>(this.isLoggedIn);
  }

  private setLoginInfo(loginInfo = false): void {
    this.isLoggedIn = loginInfo;

    this.loginInfo$.next(this.isLoggedIn);
  }

  private getUserData(uid = ''): Observable<Array<Partial<CurrentUserInfo>>> {
    return this.dataBase.list(`/usersData`).valueChanges().pipe(
      tap((data: Array<any>) => {
        this.usersExtendedData = data || [];

        if (uid) {
          const currentUser: Partial<CurrentUserInfo> | undefined =
            this.usersExtendedData.find(user => user.uid === uid);

          if (currentUser) {
            const userInfo = this.localStorageService.getParsedLocalStorageItem(LocalStorageKeys.loginInfo);

            if (userInfo) {
              userInfo.user = {
                ...userInfo?.user,
                ...currentUser
              };

              this.localStorageService.removeLocalStorageItem(LocalStorageKeys.loginInfo);
              this.localStorageService.setLocalStorageItem(LocalStorageKeys.loginInfo, userInfo);
            }
          }
        }
      })
    );
  }

  updateProfile (user: any): Promise<void> {
    return this.dataBase.list(`/usersData`).set(user.uid, user).then(() => {
      this.getUserData(user.uid).subscribe();
    });
  }

  login(loginData: LoginData): Promise<void> {
    return this.fireAuth.signInWithEmailAndPassword(loginData.email, loginData.password)
      .then((result: UserCredential | UserDataInfo) => {
        this.localStorageService.setLocalStorageItem(LocalStorageKeys.loginInfo, result);

        this.getUserData(result?.user?.uid).subscribe(() => {
          this.setLoginInfo(true);
        });
      })
      .catch((error) => {
        this.localStorageService.removeLocalStorageItem(LocalStorageKeys.loginInfo);
        this.setLoginInfo(false);
        alert('Email or Password are incorrect');
        console.log('This is error message', error.message);
      })
  }

  logout(): Promise<void> {
    return this.fireAuth.signOut().then(() => {
      this.localStorageService.removeLocalStorageItem(LocalStorageKeys.loginInfo);
      this.setLoginInfo(false);
    });
  }

  isUserLoggedIn(): boolean {
    return !!this.localStorageService.getParsedLocalStorageItem(LocalStorageKeys.loginInfo) &&
      this.isLoggedIn;
  }
}
