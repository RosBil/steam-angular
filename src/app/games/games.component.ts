import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../shared/interfaces/game.interface';
import { GamesServices } from '../shared/services/game.service';
import { SearchService } from '../shared/services/search.service';



@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, OnDestroy {
  gamesList: Game[] = [];
  checkedTags: string[] = [];
  message: string = '';
  subscription: Subscription = new Subscription();
  
  constructor(private gamesService: GamesServices, 
    private searchService: SearchService) {
  }
  changeLibraryStatus(game: Game): void {
    this.gamesService.setToLibrary(game).subscribe(() => {
      this.getGames();
    });
  }
  addToLibrary(game: Game): void {
    this.changeLibraryStatus({ ...game, inLibrary: true });
  }
  removeFromLibrary(game: Game): void {
    this.changeLibraryStatus({ ...game, inLibrary: false });
  }
  getCheckedTags(): void {
    this.checkedTags = [];
    document.querySelectorAll(('input[class=tag-filter_item--checkbox]:checked')).forEach(
      inputEl => this.checkedTags.push(inputEl.id)
    );
    this.searchService.setTags(this.checkedTags);
    console.log(this.checkedTags);
  }
  /* getGames(): void {
    this.gamesService.getGames().subscribe((data) => this.gamesList = data);
  } */
  getGames(): void {
    this.gamesList = this.searchService.gameList.slice();
  }
  searchGame(name: string): void {
    this.gamesService.getGamesByName(name).subscribe((data) => this.gamesList = data);
  }
  searchGameByPrice(price: number): void {
    this.gamesService.getGamesByPrice(price).subscribe((data) => this.gamesList = data);
  }
  searchByTag(tagArr: string[]): void {
    this.gamesService.getGamesByTag(tagArr).subscribe((data) => this.gamesList = data);
  }
  onPriceChange() {
    console.log('price changed');
  }
  ngOnInit(): void {
    /* this.getGames(); */
    this.searchGame('');
    this.subscription = this.searchService.currentGames.subscribe((games) => this.gamesList = games);

    /* this.searchService.currentMessage.subscribe((message) => this.message = message); */
    /* this.getCheckedTags(); */
    /* this.searchGameByPrice(800); */
    /* this.searchByTag(['indie', 'action']); */
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    /* this.searchService.currentGames. */
  }
}
