import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../shared/interfaces/game.interface';
import { AuthService } from '../shared/services/auth.service';
import { GamesServices } from '../shared/services/game.service';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {
  label = 'Games';
  gamesList: Game[] = [];
  checkedTags: string[] = [];
  message: string = '';
  isLoggedIn = false;
  subscription: Subscription = new Subscription();

  constructor(
    private gamesService: GamesServices,
    private searchService: SearchService,
    private auth: AuthService
  ) { }

  getGames(): void {
    this.gamesList = this.searchService.gameList.slice();
  }

  searchGame(name: string): void {
    this.searchService.setSearchPhrase(name);
    this.searchService.search();
  }

  searchGameByPrice(price: number): void {
    this.gamesService
      .getGamesByPrice(price)
      .subscribe((data) => (this.gamesList = data));
  }
  searchByTag(tagArr: string[]): void {
    this.gamesService
      .getGamesByTag(tagArr)
      .subscribe((data) => (this.gamesList = data));
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isUserLoggedIn();
    this.searchGame('');
    this.subscription = this.searchService.currentGames.subscribe(
      (games) => (this.gamesList = games)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}