import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { FriendsModule } from './friends/friends.module';
import { GamesModule } from './games/games.module';
import { LibraryModule } from './library/library.module';
import { HttpClientModule  } from '@angular/common/http';

import { FriendsServices } from './shared/services/friend.service';
import { GamesServices } from './shared/services/game.service';
import { SearchService } from './shared/services/search.service';
import { AuthService } from './shared/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    FriendsModule,
    GamesModule,
    LibraryModule
  ],
  providers: [
    FriendsServices, 
    GamesServices,
    SearchService,
    AuthService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
