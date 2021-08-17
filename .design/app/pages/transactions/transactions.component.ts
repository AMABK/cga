import {ElementSelectionService} from './../../element-selection.service';
import {ComponentInspectorService} from './../../component-inspector.service';
import {Functions} from './../../_helpers/functions';
import {Constants} from './../../_helpers/constants';
import {TransactionService} from './../../_services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
	pk: string = 'TransactionID';
	title: string = 'Transactions';
	object: string = 'Transaction';
	detailsUrl: string = '/transactions/details/';
	rows: any[];
	errorMessage: string = null;
	filter: any = {term:null};


	constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

		private dataService: TransactionService,
		private toastr: ToastrService) {this.__componentInspectorService.getComp(this);


	}

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
