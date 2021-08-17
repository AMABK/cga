import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
	
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2021-02-14' },
      { title: 'event 2', date: '2021-02-15' }
    ]
  };
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }


  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService) {this.__componentInspectorService.getComp(this);
 }

  ngOnInit(): void {
  }

}
