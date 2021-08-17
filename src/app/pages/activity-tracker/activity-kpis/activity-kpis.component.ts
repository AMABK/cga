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
  selector: 'app-activity-kpis',
  templateUrl: './activity-kpis.component.html',
  styleUrls: ['./activity-kpis.component.css']
})
export class ActivityKpisComponent implements OnInit {

	pk: string = 'KpiID';
	title: string = 'Programme KPIs';
	object: string = 'KPIs';
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
		this.activities = await this.activityService.getAll().toPromise();
			
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
			this.canDelete = (this.rows.length>0);
			/* if current kpi count is zero, then lets populate with blank kpis */
			if(this.rows.length==0){
				for(let i=0;i<this.activities.length;i++){
					 
					let activity: any = this.activities[i];
				
					let indicators : any[] = activity.Indicators? activity.Indicators : [];
				
					/* lets loop through all indicators for the current activity */
					for(let i=0;i<indicators.length;i++){
						let indicator: any = indicators[i];
					
						/* finally, lets compose our blank kpi object */
						let row: any = {
							KpiID: null,	
							ActivityID:	activity.ActivityID,
							ActivityName: activity.ActivityName,
							QualitativeQuantitative: indicator.QualitativeQuantitative,
							IndicatorName: indicator.IndicatorName,
							MeasurementUnit: indicator.MeasurementUnit,
							ProgrammeID: this.filter.ProgrammeID,							
							Year: this.filter.Year,
							Target: null,
							Achievement: null
						}
					
						this.rows.push(row);
					}
				}
			}	
			
		},err=>{
			this.errorMessage = err.message? err.message : Constants.Messages.RECORDS_NOT_FOUND;
	        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
		});
	}
	
	saveKpis(){
		this.loading = true;
		this.kpiService.createMany(this.rows)
	      .subscribe(() => {
	        this.toastr.success(Constants.Messages.SAVE_SUCCESS,Constants.Title.RECORD_OPERATION);
	        this.resetFilters();		      
	      },err=>{
	    	this.errorMessage = Functions.handleError(err,Constants.Messages.SAVE_FAILURE);	        
	        Functions.alertError(Constants.Title.FORM_VALIDATION,this.errorMessage);
	      })
	      .add(() => {this.loading = false});
	}

	/* delete kpis by year and programme */
	async deleteKpis(){
		let canDeleteConfirm = await Functions.alertDelete(Constants.Title.RECORD_OPERATION,Constants.Messages.CONFIRM_DELETE);
		if(canDeleteConfirm.isConfirmed)
		{
			this.isDeleting = true;
			this.kpiService.deleteByProgramme(this.filter)
		      .subscribe(() => {
		        this.toastr.success(Constants.Messages.DELETE_SUCCESS,Constants.Title.RECORD_OPERATION);
		        this.resetFilters();		        
		      },err=>{
		    	this.errorMessage = Functions.handleError(err,Constants.Messages.DELETE_FAILURE);
		        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
		      })
		      .add(() => {this.isDeleting = false});
		}
	}
	
	/* delete one kpi from the rows of kpis */
	async deleteKpi(row: any,index:any) {
		
		if(!row[this.pk]){
			Functions.deleteRow(this.rows,index,this.toastr);
			return;
		}
			
		let canDeleteConfirm = await Functions.alertDelete(Constants.Title.RECORD_OPERATION,Constants.Messages.CONFIRM_DELETE);
		if(canDeleteConfirm.isConfirmed)
		{
			Object.assign(row, {isDeleting: true});	  		
			this.kpiService.delete(row[this.pk]).subscribe(data=>{
				Object.assign(row, {isDeleting: false});
				/* filter out the deleted row and free it from other rows */
				this.rows = this.rows.filter(x => x[this.pk]!== row[this.pk]);	  			
				this.toastr.success(Constants.Messages.DELETE_SUCCESS,Constants.Title.RECORD_OPERATION);
			},err=>{
				Object.assign(row, {isDeleting: false});
				this.errorMessage = Functions.handleError(err,Constants.Messages.DELETE_FAILURE);
		        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
			});
		}
	}
}
