import {DemoLearningService} from './../../../_services/demo-learning.service';
import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Functions} from "../../../_helpers/functions";
import {Constants} from "../../../_helpers/constants";

@Component({
  selector: 'app-demo-learning',
  templateUrl: './demo-learning.component.html',
  styleUrls: ['./demo-learning.component.css']
})
export class DemoLearningComponent implements OnInit {

  pk: string = 'ServiceID';
  title: string = 'Demo & Learning Site';
  object: string = 'Demo & Learning';
  editUrl: string = 'services/demo-learning-edit/';
  addUrl: string = 'services/demo-learning-add';
  rows: any[];
  errorMessage: string = null;
  filter: any = {term:null};
  loading: boolean = false;


  constructor(private dataService: DemoLearningService,
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
