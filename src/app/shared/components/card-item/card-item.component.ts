import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { GamesServices } from '../../services/game.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() game!: Game;
  constructor(private gamesService: GamesServices) {}

  ngOnInit(): void {}

  changeLibraryStatus(game: Game): void {
    this.gamesService.setToLibrary(game).subscribe(() => {
      // this.getGames();
    });
  }

  addToLibrary(game: Game): void {
    this.changeLibraryStatus({ ...game, inLibrary: true });
  }

  removeFromLibrary(game: Game): void {
    this.changeLibraryStatus({ ...game, inLibrary: false });
  }
}
