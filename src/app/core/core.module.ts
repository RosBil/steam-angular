import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { OnTopBtnComponent } from './on-top-btn/on-top-btn.component';
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    OnTopBtnComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule
  ],
  exports: [
    LoginComponent,
    HeaderComponent,
    OnTopBtnComponent
  ]
})
export class CoreModule { }
