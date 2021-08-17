import {EventDetailsComponent} from './event-details/event-details.component';
import {AddEventComponent} from './add-event/add-event.component';
import {InviteComponent} from './invite/invite.component';
import {EventsComponent} from './events/events.component';
import {AuthGuard} from './../../_services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: '', component: EventsComponent,canActivate:[AuthGuard]},
	{ path: 'add', component: AddEventComponent, canActivate:[AuthGuard]},
	{ path: 'edit/:id', component: AddEventComponent, canActivate:[AuthGuard]},
	{ path: 'invite/:id', component: InviteComponent, canActivate:[AuthGuard]},
	{ path: 'details/:id', component: EventDetailsComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
