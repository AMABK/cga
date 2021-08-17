import {ActivityService} from './../../../_services/activity.service';
import {Constants} from './../../../_helpers/constants';
import {KpiService} from './../../../_services/kpi.service';
import {ProgrammeService} from './../../../_services/programme.service';
import {Functions} from './../../../_helpers/functions';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

	pk: string = 'KpiID';
	title: string = 'Kpi Achievements';
	object: string = 'Kpi Achievements';
	parentUrl: string = '/activity-tracker';
	
	rows: any[];
	errorMessage: string = null;
	loading: boolean = false;
	isDeleting: boolean = false;
	canDelete: boolean = false;
	
	filter: any = {ProgrammeID:null,Year:null,ActivityID:null};
	programmes: any[] = [];
	activities: any[] = [];
	
	constructor(
		  public functions: Functions,
		  private programmeService: ProgrammeService,
		  private activityService: ActivityService,
		  private kpiService: KpiService,
		  private toastr: ToastrService,
		  private router: Router) { 
	 
	}
	
	async ngOnInit() {
		/* get programmes and assign them to instance variables */
		this.programmeService.getAll().subscribe(data=>{this.programmes = data});
		
		/* get activities and assign them to instance variables */
		await this.activityService.getAll().toPromise().then((data)=>{
			this.activities = data;
		}).catch(() => {});
		         			
		/* get already existing kpis/or populate with blank kpi arrays */
		this.resetFilters();
	}
	
	resetFilters(){
		this.filter = {ProgrammeID:null,Year:null,ActivityID:null};
	    this.fetchKpi();
	}
	
	fetchKpi(){		
		this.kpiService.getByProgramme(this.filter).subscribe(data=>{
			this.rows = data;  				
		},err=>{
			this.errorMessage = Functions.handleError(err,Constants.Messages.RECORDS_FOUND);
	        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
		});
	}
	
	updateKpis(){
		this.loading = true;
		this.kpiService.updateMany(this.rows)
	      .subscribe(() => {
	        this.toastr.success(Constants.Messages.SAVE_SUCCESS,Constants.Title.RECORD_OPERATION);
	        this.resetFilters();		      
	      },err=>{
	    	this.errorMessage = Functions.handleError(err,Constants.Messages.SAVE_FAILURE);	        
	        Functions.alertError(Constants.Title.FORM_VALIDATION,this.errorMessage);
	      })
	      .add(() => {this.loading = false});
	}
	
}
