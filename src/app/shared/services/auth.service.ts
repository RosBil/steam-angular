import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Injectable } from '@angular/core';
import { LoginData } from '../interfaces/login-data.interface';
import { BehaviorSubject, Subject } from 'rxjs';

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
    this.auth.signOut().then(() => {
      window.localStorage.removeItem('loginInfo');
      this.setLoginInfo(false);
    });
  }

  // register({ email, password }: LoginData) {
  //   return this.auth.createUserWithEmailAndPassword(email, password);
  // }

  isUserLoggedIn() {
    return !!localStorage.getItem('loginInfo') && this.isLoggedIn;
  }
}