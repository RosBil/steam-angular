import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { FriendItemComponent } from './friend-item/friend-item.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FriendsServices } from '../shared/services/friend.service';

@NgModule({
  declarations: [FriendsComponent, FriendItemComponent],
  imports: [CommonModule, FormsModule, SharedModule],
  providers: [FriendsServices],

})
export class FriendsModule {}
