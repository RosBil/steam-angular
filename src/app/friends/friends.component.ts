import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  switchMap,
  map,
} from 'rxjs';
import { Friend } from '../shared/interfaces/friend.interface';
import { FriendsServices } from '../core/services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friendsList$: Observable<Friend[]>;
  nameQuery$ = new BehaviorSubject<string>('');
  removedFriendIds$ = new BehaviorSubject<string[]>([]);
  searchName = '';
  label = 'Friends';

  constructor(private friendsService: FriendsServices) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    const allFriends = this.nameQuery$.pipe(
      switchMap((name: string) =>
        name
          ? this.friendsService.getUserByName(name)
          : this.friendsService.getFriends()
      )
    );

    this.friendsList$ = combineLatest([
      allFriends,
      this.removedFriendIds$,
    ]).pipe(
      map(([friends, removedIdList]: [Friend[], string[]]) =>
        friends.filter((friend) => !removedIdList.includes(friend.id || ''))
      )
    );
  }

  fillField(name: string): void {
    this.searchName = name;
  }

  searchFriend(name: string): void {
    this.nameQuery$.next(name);
  }

  removeFromList(id: string): void {
    this.removedFriendIds$.next([...this.removedFriendIds$.value, id]);
  }

  clearSearch(): void {
    this.searchName = '';
    this.removedFriendIds$.next([]);
    this.nameQuery$.next('');
    this.getAllUsers();
  }
}
