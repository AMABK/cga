import {SharedModule} from './../../shared/shared.module';
import {AddUserComponent} from './add-user/add-user.component';
import {UsersComponent} from './users/users.component';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [UsersComponent,AddUserComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
