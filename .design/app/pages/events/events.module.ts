import {SharedModule} from './../../shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import {EventsComponent} from './events/events.component';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { AddEventComponent } from './add-event/add-event.component';
import { InviteComponent } from './invite/invite.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
	InviteComponent,
	EventsComponent,
	AddEventComponent,
	EventDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FullCalendarModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
