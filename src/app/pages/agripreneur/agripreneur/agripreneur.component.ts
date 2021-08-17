import {AgripreneurService} from './../../../_services/agripreneur.service';
import { ToastrService } from 'ngx-toastr';
import {Constants} from './../../../_helpers/constants';
import {Functions} from './../../../_helpers/functions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agripreneur',
  templateUrl: './agripreneur.component.html',
  styleUrls: ['./agripreneur.component.css']
})
export class AgripreneurComponent implements OnInit {
	pk: string = 'id';
	title: string = 'Agripreneurs';
	object: string = 'Agripreneur';
	editUrl: string = 'agripreneurs/edit/';
	addUrl: string = 'agripreneurs/add';
	profileUrl: string = 'agripreneurs/profile';
	rows: any[];
	errorMessage: string = null;
	filter: any = {term:null};


	constructor(private dataService: AgripreneurService,
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
