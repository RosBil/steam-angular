import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../shared/interfaces/game.interface';
import { AuthService } from '../core/services/auth.service';
import { SearchService } from '../core/services/search.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  gamesList: Game[] = [];
  isLoggedIn = true;
  subscription: Subscription = new Subscription();

  constructor(
    private searchService: SearchService,
    private auth: AuthService
  ) {}

  searchGame(): void {
    this.searchService.setDefaultFilters();
    this.searchService.search();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isUserLoggedIn();
    this.searchGame();
    this.subscription = this.searchService.currentGames.subscribe(
      (games) => (this.gamesList = games.filter(game => game.inLibrary))
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
