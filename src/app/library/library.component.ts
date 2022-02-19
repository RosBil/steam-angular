import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../shared/interfaces/game.interface';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  gamesList: Game[] = [];
 
  subscription: Subscription = new Subscription();

  constructor(
    private searchService: SearchService
  ) {}

  getGames(): void {
    this.gamesList = this.searchService.gameList.slice();
  }

  searchGame(name: string): void {
    this.searchService.setSearchPhrase(name);
    this.searchService.search();
  }

  ngOnInit(): void {
    this.searchGame('');
    this.subscription = this.searchService.currentGames.subscribe(
      (games) => (this.gamesList = games.filter(game => game.inLibrary))
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
