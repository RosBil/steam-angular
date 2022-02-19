import { Component, ContentChild, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/shared/interfaces/login-data.interface';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
   
  
export class LoginComponent implements OnInit {

  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();
  
  responsedata: any;
  formLogin: FormGroup;
  emailValidation = true;
  isLogin = true;

  public showPasswordOnPress: boolean;

   constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.formLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
     localStorage.clear();
  }

  
  ngOnInit(): void {
   
  }

   async login() {
    const { email, pass } = this.formLogin.value;
    
     await this.authService
      .login({
        email,
        password: pass
      })
        .then(() => this.router.navigate(['/games']));

  };

  // async register() {
  //   const { email, pass } = this.formLogin.value;
  //   await this.authService
  //     .register({
  //       email,
  //       password: pass
  //     })
  //     .then(() => this.router.navigate(['/profile']));
  // }

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
