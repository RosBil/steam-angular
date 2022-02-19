import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FriendsModule } from './friends/friends.module';
import { GamesModule } from './games/games.module';
import { AuthService } from './shared/services/auth.service';




import { LibraryModule } from './library/library.module';

@NgModule({
  declarations: [
    AppComponent       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FriendsModule,
    GamesModule,
    CoreModule,
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
