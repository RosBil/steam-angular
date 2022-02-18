import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


import { Game } from "../interfaces/game.interface";
import { GamesServices } from "./game.service";

@Injectable({ providedIn: "root" })
export class SearchService {
  tagList: string[] = [];
  searchPhrase: string = '';
  priceRange: number = 2000;
  gameList: Game[] = [];
 
  private gamesSource = new BehaviorSubject<Game[]>([]);
  currentGames = this.gamesSource.asObservable();

  constructor(private gameServices: GamesServices) { }

  getTags(): string[] {
    return this.tagList.slice();
  }
  setTags(tagArr: string[]): void {
    this.tagList = tagArr.slice();
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
  getPriceRange(): number {
    return this.priceRange;
  }
  setGameList(games: Game[]): void {
    this.gamesSource.next(games.slice());
    /* this.gameList = games.slice(); */
  }
  search(): void {
    this.gameServices.getGamesByName(this.searchPhrase).subscribe((games) => {
      this.gameList = games.filter((game) => game.price <= this.priceRange);
      if (this.tagList.length > 0) {
        this.gameList = this.gameList.filter((game) => {
          return this.tagList.some((tag: string) => tag === game.tag);
        });
      } 
      this.setGameList(this.gameList);
    });
  }
}