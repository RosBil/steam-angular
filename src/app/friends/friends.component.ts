import { Component, OnInit } from '@angular/core';
import { Friend } from '../shared/interfaces/friend.interface';
import { FriendsServices } from '../shared/services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friendsList: Friend[] = [];
  searchName = '';
  label = 'Friends';

  constructor(private friendsService: FriendsServices) {}

  fillField(name: string) {
    this.friendsList = []
    this.searchName = name;
  }

  getFriend() {
    this.friendsService
      .getMyFriends()
      .subscribe((friends) => (this.friendsList = friends));
  }

  searchFriend(name: string): void {
    this.friendsService.getFriendsByName(name).subscribe((friends) => {
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
}
