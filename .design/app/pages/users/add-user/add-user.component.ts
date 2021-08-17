import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import {Functions} from './../../../_helpers/functions';
import {MustMatch} from './../../../_helpers/must-match.validator';
import {Constants} from './../../../_helpers/constants';
import {UserService} from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
	pk: string = 'id';
	title: string;
	object: string = 'User';
	parentUrl: string = '/users';
	form: FormGroup;
	id: string;
	isAddMode: boolean;
	loading: boolean = false;
	errorMessage: string = '';
	submitted: boolean = false;

	constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

	    private formBuilder: FormBuilder,
	    private route: ActivatedRoute,
	    private router: Router,
	    private dataService: UserService,
	    private toastr: ToastrService,
	    public constants: Constants
	) {this.__componentInspectorService.getComp(this);
}

	ngOnInit() {
	    this.id = this.route.snapshot.params['id'];
	    this.isAddMode = !this.id;
	    this.title = (this.isAddMode? 'Add' : 'Edit') + ' ' + this.object;

	    // password not required in edit mode
	    const passwordValidators = [Validators.minLength(8)];
	    if (this.isAddMode) {
	        passwordValidators.push(Validators.required);
	    }

	    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'ConfirmPassword') };
	    this.form = this.formBuilder.group({
	        Title: ['', Validators.required],
	        username: ['', Validators.required],
	        FullName: ['', Validators.required],
	        email: ['', [Validators.required, Validators.email]],
	        UserType: ['', Validators.required],
	        password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator]],
	        ConfirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
	        PhoneNo: ['254', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
	    }, formOptions);

	    if (!this.isAddMode) {
	        this.dataService.get(this.id)
	            .pipe(first())
	            .subscribe(x => {
	            	this.form.patchValue(x);
	            	this.form.patchValue({'ConfirmPassword':x.password});
	            	this.toastr.success(Constants.Messages.RECORD_LOADED,Constants.Title.RECORD_OPERATION);
	            },err=>{
	            	this.errorMessage = err.message? err.message : Constants.Messages.RECORDS_NOT_FOUND;
	                this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
	                this.router.navigate(['../../'], { relativeTo: this.route });
		        });
	    }
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
	            this.router.navigate(['../'], { relativeTo: this.route });
	        },err=>{
	        	this.errorMessage = Functions.handleError(err,Constants.Messages.UPDATE_FAILURE);
                this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
	        })
	        .add(() => {this.loading = false});
	}

	private updateRecord() {
	    this.dataService.update(this.id, this.form.value)
	        .pipe(first())
	        .subscribe(() => {
	        	this.toastr.success(Constants.Messages.UPDATE_SUCCESS,Constants.Title.RECORD_OPERATION);
	            this.router.navigate(['../../'], { relativeTo: this.route });
	        },err=>{
	        	this.errorMessage = err.message? err.message : Constants.Messages.SAVE_FAILURE;
                this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
	        })
	        .add(() => {this.loading = false});
	}

	get f() { return this.form.controls; }
}
