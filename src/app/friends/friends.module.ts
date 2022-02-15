import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { FriendItemComponent } from './friend-item/friend-item.component';



@NgModule({
  declarations: [
    FriendsComponent,
    FriendItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FriendsModule { }
