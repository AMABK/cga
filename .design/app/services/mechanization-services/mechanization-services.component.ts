import {ElementSelectionService} from './../../element-selection.service';
import {ComponentInspectorService} from './../../component-inspector.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mechanization-services',
  templateUrl: './mechanization-services.component.html',
  styleUrls: ['./mechanization-services.component.css']
})
export class MechanizationServicesComponent implements OnInit {

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService) {this.__componentInspectorService.getComp(this);
 }

  ngOnInit(): void {
  }

}
