import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Functions } from "../../_helpers/functions";
import { DashboardService } from "../../_services/dashboard.service";
import * as _ from 'lodash';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public chartColor;
  public chartEmail;
  public chartMemberCategoryCount;
  public chartMemberByAgents;
  public chartMemberByAgents2;
  public chartCropAgreggatioByValue;
  public chartNoAgreprenuers;
  public chartNoInputSold;
  public chartCropaggregation;
  public chartFinanceByCounty;
  public topStats: any;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {

    this.dashboardService.getTopStats().subscribe(data => { this.topStats = data });
    this.chartColor = "#FFFFFF";

    this.dashboardService.getMemberNumbersByCategory().subscribe((data) => {
      let labels: any[] = _.map(data, 'label');
      let values: any[] = _.map(data, 'value');
      this.chartMemberCategoryCount = this.getBarChart(labels, values, 'chartMemberCategoryCount', '#6bd098');
    });

    this.dashboardService.getMembersRecruitedByAgents().subscribe((data) => {
      let labels: any[] = ["Sarah Magut", "Dwight Yorke", "Arnold Karani", "Rugut Ngeno", "George Owino"]//_.map(data, 'label');
      let values: any[] = [0, 2, 3, 1, 0, 0]//_.map(data, 'value');
      this.chartMemberByAgents = this.getBarChart(labels, values, 'chartMembersByAgents', '#fbc658');
    });
    this.dashboardService.getMembersRecruitedByAgents().subscribe((data) => {
      let labels: any[] = ["Bomet", "Nakuru"]//_.map(data, 'label');
      let values: any[] = [5, 230]//_.map(data, 'value');
      this.chartMemberByAgents2 = this.getBarChart(labels, values, 'chartMembersByAgents2', '#fbc658');
    });

    this.dashboardService.getMembersRecruitedByAgents().subscribe((data) => {
      let labels: any[] = ["Maize", "Green Grams", "Cow Peas"]//_.map(data, 'label');
      let values: any[] = [653, 260, 4000]//_.map(data, 'value');
      this.chartCropAgreggatioByValue = this.getPieChart(labels, values, 'chartCropAgreggatioByValue', '#fbc658');
    });

    this.dashboardService.getMembersRecruitedByAgents().subscribe((data) => {
      let labels: any[] = ["Baringo", "Bungoma"]//_.map(data, 'label');
      let values: any[] = [230, 150,]//_.map(data, 'value');
      this.chartFinanceByCounty = this.getBarChart(labels, values, 'chartFinanceByCounty', '#fbc658');
    });
    
    this.dashboardService.getNoAgreiprenuers().subscribe((data) => {
      let labels: any[] = _.map(data, 'label');
      let values: any[] = _.map(data, 'value');
      this.chartNoAgreprenuers = this.getBarChart(labels, values, 'chartAgriprenuers', '#28a745');
    });
    this.dashboardService.getNoInputSold().subscribe((data) => {
      let labels: any[] = _.map(data, 'label');
      let values: any[] = _.map(data, 'value');
      this.chartNoInputSold = this.getBarChart(labels, values, 'chartInputsold', '#007bff');
    });
    this.dashboardService.getCropAggregation().subscribe((data) => {
      let labels: any[] = ["Bomet","Bungoma","Kisumu","Kilifi", "Elgoyo Marakwet",]//_.map(data, 'label');
      let values: any[] =[430,303,3500,120,500] //_.map(data, 'value');
      this.chartCropaggregation = this.getPieChart(labels, values, 'chartCropaggregation', ["Orange", "Green", "Blue", "Purple", "Violet", "Indigo", "Maroon", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate"]);
    });

  }

  getBarChart(labels: any[], data: any[], chartID: any, color: any) {
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
  getPieChart(labels: any[], data: any[], chartID: any, color: any) {
    let canvas: any = document.getElementById(chartID);
    let ctx: any = canvas.getContext("2d");

    let chart: any = new Chart(ctx, {
      type: 'pie',
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
