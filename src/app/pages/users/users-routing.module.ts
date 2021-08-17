import {AuthGuard} from './../../_services/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {AddUserComponent} from './add-user/add-user.component';
import {UsersComponent} from './users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: '', component:UsersComponent,canActivate:[AuthGuard]},
	{ path: 'add', component: AddUserComponent, canActivate:[AuthGuard]},
	{ path: 'edit/:id', component: AddUserComponent, canActivate:[AuthGuard]},
	{ path: 'profile/:id', component: ProfileComponent, canActivate:[AuthGuard]},
	{ path: 'me', component: ProfileComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
