import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../shared/interfaces/game.interface';
import { AuthService } from '../core/services/auth.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { GamesServices } from '../core/services/game.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  gamesList$: Observable<Game[]>;
  removedGamesIds$ = new BehaviorSubject<string[]>([]);

  isLoggedIn = true;

  constructor(private auth: AuthService, private gamesService: GamesServices) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isUserLoggedIn();
    // this.gamesList$ = this.gamesService.getGamesInLibrary();
    this.getAll()
    this.gamesList$.subscribe((data) => console.log(data));
  }

  getAll(): void {
    const allGame = this.gamesService.getGamesInLibrary();
    this.gamesList$ = combineLatest([allGame, this.removedGamesIds$])
    .pipe(
      map(([games, removedIdList]: [Game[], string[]]) => {
        return games.filter((game) => !removedIdList.includes(game.id || ''));
      })
    );
  }

  removeFromList(id: string): void {
    this.removedGamesIds$.next([...this.removedGamesIds$.value, id || '']);
    this.removedGamesIds$.subscribe(data => console.log(data)
    )
  }
}
