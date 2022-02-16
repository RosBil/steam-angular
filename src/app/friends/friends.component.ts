import { Component, OnInit } from '@angular/core';
import { Friend } from '../shared/interfaces/friend.interface';
import { FriendsServices } from '../shared/services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  isSearching = true;
  friendsArr: Friend[] = [];
  constructor(private friendsService: FriendsServices) { }
  deleteFriend(deletedFriend: Friend): void {
    this.friendsArr.filter((friend) => friend.nickname !== deletedFriend.nickname);
  }
  addFriend(person: Friend): void {
    this.friendsService.setMyFriend(person).subscribe(() => console.log(`friend is added`));
    /* this function works in both ways */

    /* this.friendsService.getMyFriends().subscribe((arrOfFriends)=> this.friendsArr = arrOfFriends); */
  }
  onSearch(name: string): void {
    this.friendsService.getFriendsByName(name).subscribe((arr) => this.friendsArr = arr);
    console.log('searching friend');
  }
  onStopSearching(): void {
    this.isSearching = false;
    console.log('end search');
  }
  ngOnInit(): void {
  }


}
