import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import counties from "../../../../assets/json/counties.json";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Constants} from "../../../_helpers/constants";
import {Functions} from "../../../_helpers/functions";
import {TokenStorageService} from "../../../_services/token-storage.service";
import {first} from "rxjs/operators";
import {NotificationService} from "../../../_services/notification.service";

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {

  title: string;
  object: string = 'Send Notifications';
  parentUrl: string = '/notifications';
  form: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: NotificationService,
    private toastr: ToastrService,
    private constants: Constants,
    public functions: Functions,
    public tokenService: TokenStorageService
  ) {this.__componentInspectorService.getComp(this);
}


  ngOnInit(): void {
    this.title = 'Send Notification';
    this.form = this.formBuilder.group({
      MessageTitle: [''],
      MessageBody: ['', Validators.required],
      email: ['', [Validators.email]],
      PhoneNo: ['', [Validators.minLength(12),Validators.maxLength(12)]],
      MessageType: ['sms', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
    /* stop here if form is invalid */
    if (this.form.invalid) {
      this.toastr.error(Constants.Messages.FORM_ERROR_FOUND,Constants.Title.FORM_VALIDATION);
      console.log(this.form.errors);
      return;
    }
    this.loading = true;
    let recipient = this.form.get('MessageType').value === 'sms'? this.form.get('PhoneNo').value : this.form.get('email').value;
    let data: any = this.form.value;
    data.Recipient = recipient;
      this.send(data);
  }

  private send(data: any) {
    this.dataService.send(data)
      .pipe(first())
      .subscribe(() => {
        this.toastr.success(Constants.Messages.SEND_SUCCESS,Constants.Title.NOTIFICATION_SEND);
        this.router.navigate([this.parentUrl]);
      },err=>{
        this.errorMessage = err.message? err.message : Constants.Messages.SEND_FAILURE;
        this.toastr.error(this.errorMessage,Constants.Title.NOTIFICATION_SEND);
      })
      .add(() => {this.loading = false});
  }
  get f() { return this.form.controls; }

}
