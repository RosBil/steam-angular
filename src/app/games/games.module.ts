import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GamesFilterComponent } from './games-filter/games-filter.component';



@NgModule({
  declarations: [
    GamesComponent,
    GamesFilterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GamesModule { }
