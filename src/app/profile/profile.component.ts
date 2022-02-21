import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

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
    this.userAge = this.userInfo?.['user']?.age || '';

    this.userData = this.fb.group({
      displayName: new FormControl(this.userName, [Validators.minLength(2)]),
      email: new FormControl(this.userEmail, [Validators.required, Validators.email]),
      age: new FormControl(this.userAge, [
        Validators.min(16),
        Validators.max(100),
        Validators.pattern(/\-?\d*\.?\d{1,2}/)])
    });

    this.formValueChanged$$ = this.userData.valueChanges.subscribe((values) => {
      if (values?.displayName === this.userName && values.age === this.userAge) {
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
      user.age = this.userData.get('age')?.value;

      this.authService.updateProfile(this.userInfo);

      const info: any = window.localStorage.getItem('loginInfo');
      const userUpdatedInfo = JSON.parse(info) || {};

      this.userName =  userUpdatedInfo?.user?.displayName;
      this.userAge = userUpdatedInfo?.user?.age;

      this.userData.setValue({
        displayName: userUpdatedInfo?.user?.displayName,
        email: this.userEmail,
        age:  userUpdatedInfo?.user?.age,
      });

      this.userData.markAsPristine();
    }
  }

}
