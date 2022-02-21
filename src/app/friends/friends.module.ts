import { NgModule } from '@angular/core';
import { FriendsComponent } from './friends.component';
import { FriendItemComponent } from './friend-item/friend-item.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FriendsRoutingModule } from './friends-routing.module';


@NgModule({
  declarations: [
    FriendsComponent,
    FriendItemComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    FriendsRoutingModule
    ],
})
export class FriendsModule {}
