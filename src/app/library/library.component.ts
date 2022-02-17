import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/interfaces/game.interface';
import { GamesServices } from '../shared/services/game.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  gamesList: Game[] = [];
  constructor(private gamesService: GamesServices) { }
  getGamesInLibrary(): void{
    this.gamesService.getGamesInLibrary().subscribe((games)=> this.gamesList = games);
  }
  ngOnInit(): void {
    this.getGamesInLibrary();
  }

}
