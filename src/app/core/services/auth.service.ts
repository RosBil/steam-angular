import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireDatabase} from '@angular/fire/compat/database'

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {LoginData} from "../../shared/interfaces/login-data.interface";
import {User} from "../../shared/interfaces/user.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginInfo$ = new BehaviorSubject(!!window.localStorage.getItem('loginInfo'));

  private isLoggedIn: any = !!window.localStorage.getItem('loginInfo');
  private usersExtendedData: Array<any> = [];

  constructor(public auth: AngularFireAuth,
              private db: AngularFireDatabase) {

  }

  private async setLoginInfo(loginInfo = false) {
    this.isLoggedIn = loginInfo;

    this.loginInfo$.next(this.isLoggedIn);
  }

  private getUserData(uid: string = ''): Observable<any> {
    return this.db.list(`/usersData`).valueChanges().pipe(
      tap(data => {
        this.usersExtendedData = data || [];

        if (uid) {
          const currentUser =  this.usersExtendedData.find(user => user.uid === uid);

          if (currentUser) {
            const info = window.localStorage.getItem('loginInfo');
            const userInfo = info ? JSON.parse(info) : null;

            if (userInfo) {
              userInfo['user'] = {
                ...userInfo?.user,
                ...currentUser
              };

              window.localStorage.removeItem('loginInfo');
              window.localStorage.setItem('loginInfo', JSON.stringify(userInfo));
            }
          }
        }
      })
    );
  }

  updateProfile (user: User) {
    return this.db.list(`/usersData`).set(user.uid, user).then(() => {
      this.getUserData(user.uid).subscribe();
    });
  }

  login(loginData: LoginData) {
    return this.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
      .then((result) => {
        window.localStorage.setItem('loginInfo', JSON.stringify(result));

        this.getUserData(result?.user?.uid).subscribe(() => {
          this.setLoginInfo(true);
        });
      })
      .catch((error) => {
        window.localStorage.removeItem('loginInfo');
        this.setLoginInfo(false);
        alert('Email or Password are incorrect');
        console.log('This is error message', error.message);
      })
  }

  logout() {
    return this.auth.signOut().then(() => {
      window.localStorage.removeItem('loginInfo');
      this.setLoginInfo(false);
    });
  }

  // updateProfile(profile: any) {
  //   return this.auth.updateCurrentUser(profile).then((res) => {
  //     window.localStorage.removeItem('loginInfo');
  //     window.localStorage.setItem('loginInfo', JSON.stringify(res));
  //   });
  // }

  isUserLoggedIn() {
    return !!localStorage.getItem('loginInfo') && this.isLoggedIn;
  }
}
