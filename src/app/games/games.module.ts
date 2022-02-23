import { NgModule } from '@angular/core';
import { GamesComponent } from './games.component';
import { GamesFilterComponent } from './games-filter/games-filter.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';

@NgModule({
  declarations: [
    GamesComponent,
    GamesFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GamesRoutingModule
  ],
})
export class GamesModule {}
