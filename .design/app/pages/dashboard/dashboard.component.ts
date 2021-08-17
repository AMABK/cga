import {ElementSelectionService} from './../../element-selection.service';
import {ComponentInspectorService} from './../../component-inspector.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {Functions} from "../../_helpers/functions";
import {DashboardService} from "../../_services/dashboard.service";
import * as _ from 'lodash';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

	  public chartColor;
	  public chartEmail;
	  public chartMemberCategoryCount;
	  public chartMemberByAgents;
	  public topStats: any;
  
  	constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
private dashboardService: DashboardService) {this.__componentInspectorService.getComp(this);

  	}
  	
    ngOnInit(){
    	
      this.dashboardService.getTopStats().subscribe(data=>{this.topStats = data});
      this.chartColor = "#FFFFFF";
            
      this.dashboardService.getMemberNumbersByCategory().subscribe((data)=>{    	
    	  let labels: any[] = _.map(data, 'label');
      	  let values: any[] = _.map(data, 'value');      
      	  this.chartMemberCategoryCount = this.getBarChart(labels,values,'chartMemberCategoryCount','#6bd098');
      });
      
      this.dashboardService.getMembersRecruitedByAgents().subscribe((data)=>{    	
    	  let labels: any[] = _.map(data, 'label');
      	  let values: any[] = _.map(data, 'value');      
      	  this.chartMemberByAgents = this.getBarChart(labels,values,'chartMembersByAgents','#fbc658');
      });
      
    }
    
    getBarChart(labels: any[], data: any[], chartID: any, color: any){
    	let canvas: any = document.getElementById(chartID);
        let ctx: any = canvas.getContext("2d");
    
        let chart: any = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
            	barPercentage: 1,
                pointRadius: 0,
                pointHoverRadius: 0,
                borderWidth: 3,
                data: data,
                backgroundColor: color,
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  fontColor: "#9f9f9f",
                  beginAtZero: true,
                  maxTicksLimit: 1,
                  padding: 20
                },
                gridLines: {
                  drawBorder: false,
                  zeroLineColor: "#ccc",
                  color: 'rgba(255,255,255,0.05)'
                }
              }],
              xAxes: [{
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(255,255,255,0.1)',
                  zeroLineColor: "transparent",
                  display: false,
                },
                ticks: {
                  padding: 20,
                  fontColor: "#9f9f9f"
                }
              }]
            },
          }
        });
    
    	return chart;
    }
}
