import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from '../shared/interfaces/friend.interface';
import { FriendsServices } from '../shared/services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friendsList$!: Observable<Friend[]>;

  friendsSearchList: Friend[] = [];

  searchName = '';

  constructor(private friendsService: FriendsServices) {}

  searchFriend(name: string): void {
    this.friendsService.getFriendsByName(name).subscribe((friends) => {
      this.friendsSearchList = friends;
    });
  }

  ngOnInit(): void {
    this.friendsList$ = this.friendsService.getMyFriends();
  }
}
