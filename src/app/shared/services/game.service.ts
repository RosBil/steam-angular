import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Game } from '../interfaces/game.interface';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class GamesServices {
  constructor(private http: HttpClient) { }

  getGamesByName(name: string): Observable<Game[]> {
    return this.http.get<Game>(`${environment.fbDbUrl}/games.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
      }),
      map((games) =>
        games.filter((game) => game.title.toLowerCase().includes(name.trim().toLowerCase()))
      )
    );
  }

  setToLibrary(game: Game): Observable<Game> {
    return this.http.patch<Game>(`${environment.fbDbUrl}/games/${game.id}.json`, game);
  }
}