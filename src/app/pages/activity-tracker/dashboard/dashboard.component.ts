import {ProgrammeService} from './../../../_services/programme.service';
import {Constants} from './../../../_helpers/constants';
import {Functions} from './../../../_helpers/functions';
import {DashboardService} from './../../../_services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	pk: string = 'ServiceCategoryID';
	title: string = 'Activity Tracker Dashboard';
	object: string = 'Activity Tracker Dashboard';
	
	rows: any[];
	errorMessage: string = null;
	loading: boolean = false;

	programmes: any[] = [];

	filter: any = {ProgrammeID:null,Year: null,IndicatorName:null};

	constructor(
			public dashboardService: DashboardService,
			public programmeService: ProgrammeService,
			public toastr: ToastrService,
			public functions: Functions,
			public router: Router) { }

	ngOnInit(): void {
		/* get programmes and assign them to instance variables */
		this.programmeService.getAll().subscribe(data=>{this.programmes = data});
		
		this.filter.Year = (new Date()).getFullYear();
		this.fetchData();
  	}
	
	fetchData(){
		this.loading = true;
		this.dashboardService.getActivityDashboard(this.filter).subscribe(data=>{
			this.rows = data;  		
			for(let c =0; c<this.rows.length;c++){
				let row = this.rows[c];
				this.rows[c].Previous = Functions.objectify(row?.Previous,'IndicatorName');
				this.rows[c].Current = Functions.objectify(row?.Current,'IndicatorName');
			}
		},err=>{
			this.errorMessage = Functions.handleError(err,Constants.Messages.RECORDS_FOUND);
	        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
		}).add(()=>{this.loading = false});
	}

}
