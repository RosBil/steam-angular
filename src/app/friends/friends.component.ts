import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Friend } from '../shared/interfaces/friend.interface';
import { FriendsServices } from '../core/services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  friendsList: Friend[] = [];
  searchName = '';
  label = 'Friends';
  subscription: Subscription = new Subscription();

  constructor(private friendsService: FriendsServices) {}

  fillField(name: string) {
    this.friendsList = [];
    this.searchName = name;
  }

  getFriend() {
    this.subscription = this.friendsService
      .getMyFriends()
      .subscribe((friends) => (this.friendsList = friends));
  }

  searchFriend(name: string): void {
    this.subscription = this.friendsService
      .getFriendsByName(name)
      .subscribe((friends) => {
        this.friendsList = friends;
      });
  }

  removeFromList(id: string) {
    this.friendsList = this.friendsList.filter((friend) => friend.id !== id);
  }

  clearSearch() {
    this.searchName = '';
    this.getFriend();
  }

  ngOnInit(): void {
    this.getFriend();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
