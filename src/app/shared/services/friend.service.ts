import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Friend } from '../interfaces/friend.interface';
import { Game } from '../interfaces/game.interface';

@Injectable({ providedIn: 'root' })
export class FriendsServices {
  constructor(private http: HttpClient) {}

  private getDate(callbackFn: any) {
    return this.http.get<Game>(`${environment.fbDbUrl}/friends.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
      }),
      map((friends) => friends.filter(callbackFn))
    );
  }

  public getFriendsByName(name: string): Observable<Friend[]> {
    return this.getDate(
      (friend: any) =>
        friend.nickname.toLowerCase().includes(name.trim().toLowerCase()) &&
        friend.isFriend !== true
    );
  }

  public getMyFriends(): Observable<Friend[]> {
    return this.getDate((friend: any) => friend.isFriend);
  }

  public setMyFriend(friend: Friend): Observable<Friend> {
    return this.http.patch<Friend>(
      `${environment.fbDbUrl}/friends/${friend.id}.json`,
      friend
    );
  }
}
