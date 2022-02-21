import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { SharedModule } from '../shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  declarations: [
    LibraryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
