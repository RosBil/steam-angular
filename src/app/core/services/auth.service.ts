import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Injectable } from '@angular/core';
import { LoginData } from '../../shared/interfaces/login-data.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import firebase from "firebase/compat";
import User = firebase.User;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: any = false;

  loginInfo$ = new BehaviorSubject(false);

  constructor(public auth: AngularFireAuth) { }

  private setLoginInfo(loginInfo = false): void {
    this.isLoggedIn = loginInfo;

    this.loginInfo$.next(this.isLoggedIn);
  }

  login(loginData: LoginData) {
    return this.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
      .then((result) => {
        this.setLoginInfo(true);
        window.localStorage.setItem('loginInfo', JSON.stringify(result));
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

  updateProfile(profile: any) {
    let info = window.localStorage.getItem('loginInfo');
    info = info ? JSON.parse(info) : info;

    if (info) {
      window.localStorage.removeItem('loginInfo');
      window.localStorage.setItem('loginInfo', JSON.stringify(profile));
    }
    // return this.auth.updateCurrentUser(profile);
  }

  // register({ email, password }: LoginData) {
  //   return this.auth.createUserWithEmailAndPassword(email, password);
  // }

  isUserLoggedIn() {
    return !!localStorage.getItem('loginInfo') && this.isLoggedIn;
  }
}
