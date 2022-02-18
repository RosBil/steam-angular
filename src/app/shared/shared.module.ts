import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { CardItemComponent } from './components/card-item/card-item.component';



@NgModule({
  declarations: [
    SearchComponent,
    CardItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchComponent,
    CardItemComponent
  ]
})
export class SharedModule { }
