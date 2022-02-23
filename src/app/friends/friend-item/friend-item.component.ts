import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/shared/interfaces/friend.interface';
import { FriendsServices } from 'src/app/core/services/friends.service';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.scss'],
})
export class FriendItemComponent {
  @Input() friend!: Friend;
  @Output() remove = new EventEmitter<string>();

  constructor(private friendService: FriendsServices) {}

  private changeStatus(friend: Friend, status: boolean): Observable<Friend> {
    return this.friendService.setMyFriend({ ...friend, isFriend: !status });
  }

  public setFriend(friend: Friend): void {
    this.changeStatus(friend, friend.isFriend).subscribe(() =>
      this.remove.emit(friend.id)
    );
  }
}
