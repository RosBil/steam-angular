import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { GamesServices } from '../../../core/services/game.service';
import { SearchService } from '../../../core/services/search.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() game!: Game;
  isLoggedIn: boolean = false;
  
  constructor(private gamesService: GamesServices, 
    private searchService: SearchService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  changeLibraryStatus(game: Game): void {
    this.gamesService.setToLibrary(game).subscribe(() => {
      this.searchService.search();
    });
  }

  addToLibrary(game: Game): void {
    this.changeLibraryStatus({ ...game, inLibrary: true });
  }

  removeFromLibrary(game: Game): void {
    this.changeLibraryStatus({ ...game, inLibrary: false });    
  }
}
