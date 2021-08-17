import {FinanceService} from './../../../_services/finance.service';
import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Functions} from "../../../_helpers/functions";
import {Constants} from "../../../_helpers/constants";

@Component({
  selector: 'app-finance-services',
  templateUrl: './finance-services.component.html',
  styleUrls: ['./finance-services.component.css']
})
export class FinanceServicesComponent implements OnInit {
  pk: string = 'ServiceID';
  title: string = 'Finance Service';
  object: string = 'Service';
  editUrl: string = 'services/finance-edit/';
  addUrl: string = 'services/finance-add';
  rows: any[];
  errorMessage: string = null;
  filter: any = {term:null};
  loading: boolean = false;


  constructor(private dataService: FinanceService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = true;
    this.dataService.getAll().subscribe(data=>{
      this.rows = data;
    },err=>{
      this.errorMessage = Functions.handleError(err,Constants.Messages.RECORDS_NOT_FOUND);
      this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
    }).add(()=>{ this.loading = true; });
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
