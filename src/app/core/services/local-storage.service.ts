import { Injectable } from '@angular/core';

import { LocalStorageKeys } from "../enums/local-storage-keys";
import { UserDataInfo } from "../models/user-data-info";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
  ) { }

  setLocalStorageItem(key: LocalStorageKeys, data:  UserCredential | UserDataInfo): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  getParsedLocalStorageItem(key: LocalStorageKeys): UserDataInfo {
    const localStorageData =  window.localStorage.getItem(key);

    return localStorageData ? JSON.parse(localStorageData) : null;
  }

  removeLocalStorageItem(key: LocalStorageKeys): void {
    window.localStorage.removeItem(key)
  }

}

