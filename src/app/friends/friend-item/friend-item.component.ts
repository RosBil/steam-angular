import { Component, Input, OnInit } from '@angular/core';
import { Friend } from 'src/app/shared/interfaces/friend.interface';
import { FriendsServices } from 'src/app/shared/services/friend.service';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.scss'],
})
export class FriendItemComponent implements OnInit {
  @Input() friend!: Friend;

  constructor(private friendService: FriendsServices) {}

  removeFriend(friend: Friend): void {
    this.friendService
      .setMyFriend({ ...friend, isFriend: false })
      .subscribe(() => {
        console.log(`You remove ${friend.nickname} from friends`);
      });
  }

  addFriend(friend: Friend): void {
    this.friendService
      .setMyFriend({ ...friend, isFriend: true })
      .subscribe(() => {
        console.log(`You add ${friend.nickname} from friends`);
      });
  }

  ngOnInit(): void {}
}
