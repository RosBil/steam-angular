import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../core/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: FormGroup;

  userInfo: {[key: string]: any} | null = null;
  userEmail = '';
  userName = '';
  userAge = '';

  private formValueChanged$$: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const info = window.localStorage.getItem('loginInfo');
    this.userInfo = info ? JSON.parse(info) : null;

    this.userEmail = this.userInfo?.['user']?.email || '';
    this.userName = this.userInfo?.['user']?.displayName || '';
    this.userAge = this.userInfo?.['user']?.userAge || '';

    this.userData = this.fb.group({
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
    const user = this.userInfo?.['user'];

    if (user) {
      user.displayName = this.userData.get('displayName')?.value;
      user.userAge = this.userData.get('userAge')?.value;

      this.authService.updateProfile(user).then(() => {
        const info: any = window.localStorage.getItem('loginInfo');
        const userUpdatedInfo = JSON.parse(info) || {};

        this.userName =  userUpdatedInfo?.user?.displayName;
        this.userAge = userUpdatedInfo?.user?.userAge;

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
