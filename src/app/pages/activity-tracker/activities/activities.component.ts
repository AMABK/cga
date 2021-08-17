import {ActivityService} from './../../../_services/activity.service';
import { ToastrService } from 'ngx-toastr';
import {Constants} from './../../../_helpers/constants';
import {Functions} from './../../../_helpers/functions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

	pk: string = 'ActivityID';
	title: string = 'Activities';
	object: string = 'Activity';
	editUrl: string = 'activity-tracker/edit-activity/';
	addUrl: string = 'activity-tracker/add-activity';
	rows: any[];
	errorMessage: string = null;
	filter: any = {term:null};


	constructor(private dataService: ActivityService,
			private toastr: ToastrService) { }

	ngOnInit() {
		this.dataService.getAll().subscribe(data=>{
			this.rows = data;
		},err=>{
			this.errorMessage = Functions.handleError(err,Constants.Messages.RECORDS_NOT_FOUND);
	        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
		});
	}

	async deleteRow(row: any) {
		let canDeleteConfirm = await Functions.alertDelete(Constants.Title.RECORD_OPERATION,Constants.Messages.CONFIRM_DELETE);
		if(canDeleteConfirm.isConfirmed)
		{
			Object.assign(row, {isDeleting: true});
  		this.dataService.delete(row[this.pk]).subscribe(data=>{
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
