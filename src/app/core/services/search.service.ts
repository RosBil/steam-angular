import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Game } from "../../shared/interfaces/game.interface";
import { GamesServices } from "./game.service";

@Injectable({ providedIn: "root" })
export class SearchService {
  private tagList: string[] = [];
  private searchPhrase: string = '';
  private priceRange: number = 2000;
  private gameList: Game[] = [];

  private gamesSource = new BehaviorSubject<Game[]>([]);
  currentGames = this.gamesSource.asObservable();

  constructor(private gameServices: GamesServices) { }

  setTags(tagArr: string[]): void {
    this.tagList = tagArr.slice();
  }
  addTag(tag: string): void {
    if (!this.tagList.includes(tag)) {
      this.tagList.push(tag);
    }
  }
  removeTag(tag: string): void {
    this.tagList = this.tagList.filter((tagEl) => tagEl !== tag.trim());
  }
  setSearchPhrase(phrase: string): void {
    this.searchPhrase = phrase;
  }
  getSearchPhrase(): string {
    return this.searchPhrase;
  }
  setPriceRange(value: number): void {
    if (value >= 0) {
      this.priceRange = value;
    }
  }
  setGameList(games: Game[]): void {
    this.gamesSource.next(games.slice());
  }
  setDefaultFilters(): void {
    this.setTags([]);
    this.setPriceRange(2000);
    this.setSearchPhrase('');
  }
  filterGames(): void {
    const filteredGames: Game[] = this.tagList.length > 0 ?
    this.gameList.filter((game) => (game.price <= this.priceRange) && (this.tagList.includes(game.tag))) :
    this.gameList.filter((game) => (game.price <= this.priceRange));
    this.setGameList(filteredGames);
  }
  search(): void {
    this.gameServices.getGamesByName(this.searchPhrase).subscribe((games) => {
      this.gameList = games.slice();
      this.filterGames();
    })
  }
}