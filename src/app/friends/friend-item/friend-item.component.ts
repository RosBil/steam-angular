import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Friend } from 'src/app/shared/interfaces/friend.interface';
import { FriendsServices } from 'src/app/core/services/friend.service';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.scss'],
})
export class FriendItemComponent {
  @Input() friend!: Friend;
  @Output() remove: EventEmitter<string> = new EventEmitter<string>();


  constructor(private friendService: FriendsServices) {}

  private changeStatus(friend: Friend, callback: any, status: boolean) {
    this.friendService
      .setMyFriend({ ...friend, isFriend: !status })
      .subscribe(callback);
  }

  public setFriend(friend: Friend): void {
    this.changeStatus(
      friend,
      () => {
        this.remove.emit(friend.id);
      },
      friend.isFriend
    );
  }
}
