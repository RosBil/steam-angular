import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LibraryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LibraryModule { }
