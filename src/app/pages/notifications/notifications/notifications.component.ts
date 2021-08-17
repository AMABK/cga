import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../../_services/notification.service";
import {Functions} from "../../../_helpers/functions";
import {Constants} from "../../../_helpers/constants";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  pk: string = 'NotificationID';
  title: string = 'Notifications';
  object: string = 'Notification';
  editUrl: string = 'notification';
  addUrl: string = 'notifications/send-notification';
  rows: any[];
  errorMessage: string = null;
  filter: any = {term:null};
  loading: boolean = false;
  isShowDiv = [];
  constructor(private dataService: NotificationService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;
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
