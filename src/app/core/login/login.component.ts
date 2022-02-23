import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginData} from 'src/app/shared/interfaces/login-data.interface';
import {AuthService} from 'src/app/core/services/auth.service';
import {from} from "rxjs";
import {LocalStorageKeys} from "../enums/local-storage-keys";
import {LocalStorageService} from "../services/local-storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {

  @Output() formData = new EventEmitter<LoginData>();

  formLogin: FormGroup;
  emailValidation = true;
  isLogin = true;

  public showPasswordOnPress: boolean;

   constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
     this.localStorageService.removeLocalStorageItem(LocalStorageKeys.loginInfo);
  }

   login() {
    const { email, pass } = this.formLogin.value;

    from(this.authService.login({
      email,
      password: pass
    }))
      .subscribe(() => this.router.navigate(['/games'])
   )

      // this.authService
      // .login({
      //   email,
      //   password: pass
      // })
      //   .then(() => this.router.navigate(['/games']));
  };

   get f(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }

  onSubmit() {
    this.formData.emit(this.formLogin.value);
    console.log('Submited', this.formLogin)
  }

  get email() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }


}
