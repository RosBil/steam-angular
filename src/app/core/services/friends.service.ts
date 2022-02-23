import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Friend } from '../../shared/interfaces/friend.interface';

type CallbackFunctionFilter<Friend> = (value: Friend) => boolean;

@Injectable({ providedIn: 'root' })
export class FriendsServices {
  constructor(private http: HttpClient) {}

  private getAllUser<Friend>(callbackFn: CallbackFunctionFilter<Friend>): Observable<Friend[]>  {
    return this.http
      .get<Friend>(`${environment.firebase.databaseURL}/friends.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response).map((key) => ({
            ...response[key],
            id: key,
          }));
        }),
        map((friends) => friends.filter(callbackFn))
      );
  }

  public getUserByName(name: string): Observable<Friend[]> {
    return this.getAllUser<Friend>((friend: Friend) =>
      friend.nickname?.toLowerCase()?.includes(name.trim()?.toLowerCase())
    );
  }

  public getFriends(): Observable<Friend[]> {
    return this.getAllUser<Friend>((friend: Friend) => friend.isFriend);
  }

  public setMyFriend(friend: Friend): Observable<Friend> {
    return this.http.patch<Friend>(
      `${environment.firebase.databaseURL}/friends/${friend.id}.json`,
      friend
    );
  }
}
