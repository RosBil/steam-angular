import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GamesFilterComponent } from './games-filter/games-filter.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    GamesComponent,
    GamesFilterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class GamesModule { }
