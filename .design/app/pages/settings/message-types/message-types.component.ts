import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Constants} from "../../../_helpers/constants";
import {first} from "rxjs/operators";
import {MessageTypeService} from "../../../_services/message-type.service";
import {Functions} from "../../../_helpers/functions";

@Component({
  selector: 'app-message-types',
  templateUrl: './message-types.component.html',
  styleUrls: ['./message-types.component.css']
})
export class MessageTypesComponent implements OnInit {

  pk: string = 'MessageTypeID';
  title: string;
  object: string = 'Message Type';
  parentUrl: string = '/settings/message-types';
  editUrl: string = '/settings/message-types/';
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  userManagers: any[] = [];
  rows: any[];

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: MessageTypeService,
    private toastr: ToastrService,
    private constants: Constants
  ) {this.__componentInspectorService.getComp(this);
}

  loadRecords(): void{
    this.dataService.getAll().subscribe(data=>{
      this.rows = data;
    },err=>{
      this.errorMessage = Functions.handleError(err,Constants.Messages.RECORDS_NOT_FOUND);
      this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
    });
  }
  
  initForm(): void {
	  this.form = this.formBuilder.group({
	      Description: ['', Validators.required]
	    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.title = (this.isAddMode? 'Add' : 'Edit') + ' ' + this.object;
    
    this.initForm();
    
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        if (!this.isAddMode) {
          this.dataService.get(this.id)
            .pipe(first())
            .subscribe(x => {
              this.form.patchValue(x);
              this.toastr.success(Constants.Messages.RECORD_LOADED, Constants.Title.RECORD_OPERATION);
            }, err => {
              this.errorMessage = err.message ? err.message : Constants.Messages.RECORDS_NOT_FOUND;
              this.toastr.error(this.errorMessage, Constants.Title.RECORD_OPERATION);
              this.router.navigate(['../../'], {relativeTo: this.route});
            });
        }
      }
    );
    this.loadRecords();
  }
  onSubmit() {
    this.submitted = true;
    /* stop here if form is invalid */
    if (this.form.invalid) {
      this.toastr.error(Constants.Messages.FORM_ERROR_FOUND,Constants.Title.FORM_VALIDATION);
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createRecord();
    } else {
      this.updateRecord();
    }
  }


  private createRecord() {
    this.dataService.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.toastr.success(Constants.Messages.SAVE_SUCCESS,Constants.Title.RECORD_OPERATION);
        this.loadRecords();
        this.initForm();
      },err=>{
        this.errorMessage = err.message? err.message : Constants.Messages.UPDATE_FAILURE;
        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
      })
      .add(() => {this.loading = false});
  }

  private updateRecord() {
    this.dataService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.toastr.success(Constants.Messages.UPDATE_SUCCESS,Constants.Title.RECORD_OPERATION);
        this.router.navigate([this.parentUrl]);
      },err=>{
        this.errorMessage = err.message? err.message : Constants.Messages.SAVE_FAILURE;
        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
      })
      .add(() => {this.loading = false});
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

  get f() { return this.form.controls; }

}
