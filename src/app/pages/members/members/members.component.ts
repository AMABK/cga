import {MemberTypeService} from './../../../_services/member-type.service';
import {MemberCategoryService} from './../../../_services/member-category.service';
import {MemberService} from './../../../_services/member.service';
import { ToastrService } from 'ngx-toastr';
import {Constants} from './../../../_helpers/constants';
import {Functions} from './../../../_helpers/functions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

	pk: string = 'id';
	title: string = 'Members';
	object: string = 'Member';
	editUrl: string = 'members/edit/';
	addUrl: string = 'members/register';
	profileUrl: string = 'members/profile';
	rows: any[];
	errorMessage: string = null;
	filter: any = {term:null};

	memberCategories: any = {};
	memberTypes: any = {}

	constructor(private dataService: MemberService,
			private memberCategoryService: MemberCategoryService,
			private memberTypeService: MemberTypeService,
			private toastr: ToastrService) { }

	ngOnInit() {

		this.dataService.getAll().subscribe(data=>{
			this.rows = data;
		},err=>{
			this.errorMessage = Functions.handleError(err,Constants.Messages.RECORDS_NOT_FOUND);
	        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
		});

		this.memberTypeService.getAll().subscribe(data=>{this.memberTypes = Functions.objectify(data,'TypeID')});
		this.memberCategoryService.getAll().subscribe(data=>{this.memberCategories = Functions.objectify(data,'CategoryID')});

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
