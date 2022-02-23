import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { GamesServices } from '../../../core/services/game.service';
import { SearchService } from '../../../core/services/search.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input()game!: Game;
  @Output() remove = new EventEmitter<string>();
  constructor(private gamesService: GamesServices,
    private searchService: SearchService,
    public authService: AuthService) {}

  changeLibraryStatus(game: Game): void {
    this.gamesService.setToLibrary(game).subscribe(() => {
      this.searchService.search();
      return this.remove.emit(game.id)
    });
  }

  addToLibrary(game: Game): void {
    this.changeLibraryStatus({ ...game, inLibrary: true });

  }

  removeFromLibrary(game: Game): void {
    this.changeLibraryStatus({ ...game, inLibrary: false });
  }
}
