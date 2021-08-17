import {Routes,RouterModule} from '@angular/router';
import {AgripreneurComponent} from './agripreneur/agripreneur.component';
import {AuthGuard} from './../../_services/auth.guard';
import {AgripreneurProfileComponent} from './agripreneur-profile/agripreneur-profile.component';
import {AddAgripreneurComponent} from './add-agripreneur/add-agripreneur.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{ path: '', component:AgripreneurComponent,canActivate:[AuthGuard]},
	{ path: 'add', component: AddAgripreneurComponent, canActivate:[AuthGuard]},
	{ path: 'edit/:id', component: AddAgripreneurComponent, canActivate:[AuthGuard]},
	{ path: 'profile/:id', component: AgripreneurProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgripreneurRoutingModule { }
