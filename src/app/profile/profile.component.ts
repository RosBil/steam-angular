import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../core/services/auth.service";
import {LocalStorageService} from "../core/services/local-storage.service";
import {LocalStorageKeys} from "../core/enums/local-storage-keys";
import {UserDataInfo} from "../core/models/user-data-info";
import {CurrentUserInfo} from "../core/models/current-user-info";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: FormGroup;

  userInfo: UserDataInfo | null = null;
  userEmail = '';
  userName = '';
  userAge = '';

  private formValueChanged$$: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.localStorageService.getParsedLocalStorageItem(LocalStorageKeys.loginInfo);

    this.userEmail = this.userInfo?.['user']?.email || '';
    this.userName = this.userInfo?.['user']?.displayName || '';
    this.userAge = this.userInfo?.['user']?.userAge || '';

    this.userData = this.formBuilder.group({
      displayName: new FormControl(this.userName, [Validators.minLength(2)]),
      email: new FormControl(this.userEmail, [Validators.required, Validators.email]),
      userAge: new FormControl(this.userAge, [
        Validators.min(12),
        Validators.max(100),
        Validators.pattern(/\-?\d*\.?\d{1,2}/)])
    });

    this.formValueChanged$$ = this.userData.valueChanges.subscribe((values) => {
      if (values?.displayName === this.userName && values.userAge === this.userAge) {
        this.userData.markAsPristine();
      }
    });
  }

  ngOnDestroy() {
    this.formValueChanged$$.unsubscribe();
  }

  editUserProfile() {
    const user: Partial<CurrentUserInfo> = this.userInfo?.user || {};

    if (user) {
      user.displayName = this.userData.get('displayName')?.value || '';
      user.userAge = this.userData.get('userAge')?.value || '';

      this.authService.updateProfile(user).then(() => {
        const userUpdatedInfo: UserDataInfo =
          this.localStorageService.getParsedLocalStorageItem(LocalStorageKeys.loginInfo);

        this.userName = userUpdatedInfo?.user?.displayName || '';
        this.userAge = userUpdatedInfo?.user?.userAge || '';

        this.userData.setValue({
          displayName: userUpdatedInfo?.user?.displayName,
          email: this.userEmail,
          userAge:  userUpdatedInfo?.user?.userAge,
        });

        this.userData.markAsPristine();
      });
    }
  }

}
