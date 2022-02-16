import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { HttpClient } from '@angular/common/http';
import { GamesServices } from '../shared/services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  gamesList: Game[] = [];
  constructor(private http: HttpClient, private gamesService: GamesServices) {     
  }
  getGamesData(): void {
    this.gamesService.getGames().subscribe((data)=> this.gamesList = data);
  }
  searchGame(name: string): void {
    this.gamesService.getGamesByName(name).subscribe((data)=> this.gamesList = data);
  }
  searchGameByPrice(price: number): void {
    this.gamesService.getGamesByPrice(price).subscribe((data)=> this.gamesList = data);
  }
  searchByTag(tagArr: string[]): void {
    this.gamesService.getGamesByTag(tagArr).subscribe((data)=> this.gamesList = data);
  }
  ngOnInit(): void {
    /* this.getGamesData(); */
    /* this.searchGameByPrice(800); */
    /* this.searchByTag(['indie', 'action']); */
  }
  
}
