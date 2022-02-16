import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendsModule } from './friends/friends.module';
import { GamesModule } from './games/games.module';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FriendsModule,
    GamesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
