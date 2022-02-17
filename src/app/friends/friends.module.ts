import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { FriendItemComponent } from './friend-item/friend-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FriendsComponent,
    FriendItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FriendsModule { }
