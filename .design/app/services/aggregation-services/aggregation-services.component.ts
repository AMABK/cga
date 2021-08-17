import {ElementSelectionService} from './../../element-selection.service';
import {ComponentInspectorService} from './../../component-inspector.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aggregation-services',
  templateUrl: './aggregation-services.component.html',
  styleUrls: ['./aggregation-services.component.css']
})
export class AggregationServicesComponent implements OnInit {

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService) {this.__componentInspectorService.getComp(this);
 }

  ngOnInit(): void {
  }

}
