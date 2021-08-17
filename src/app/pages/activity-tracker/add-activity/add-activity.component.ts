import {ServiceCategoryService} from './../../../_services/service-category.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray,Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Constants} from "../../../_helpers/constants";
import {first} from "rxjs/operators";
import {ActivityService} from "../../../_services/activity.service";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  pk: string = 'id';
  title: string;
  object: string = 'Activity';
  parentUrl: string = '/activity-tracker/activities';
  form: FormGroup;
  indicatorsForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;

  serviceCategories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: ActivityService,
    private serviceCategoryService: ServiceCategoryService,
    private toastr: ToastrService,
    private constants: Constants
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.title = (this.isAddMode? 'Add' : 'Edit') + ' ' + this.object;

    this.form = this.formBuilder.group({
      ActivityName: ['', Validators.required],
      ServiceCategoryID: ['', Validators.required]
    });


	this.indicatorsForm = this.formBuilder.group({
		tableRows: this.formBuilder.array([])
    });

    /* get service categories and assign them to instance variables */
	this.serviceCategoryService.getAll().subscribe(data=>{this.serviceCategories = data});

    if (!this.isAddMode) {
      this.dataService.get(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          if(!x.Indicators) {
			this.addRow();
		  }
		  else{
			for(let i=0; i<x.Indicators.length;i++){
				this.addRow();
			}
			this.indicatorsForm.patchValue({tableRows:x.Indicators});
		  }
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
    if (this.form.invalid || this.indicatorsForm.invalid) {
      this.toastr.error(Constants.Messages.FORM_ERROR_FOUND,Constants.Title.FORM_VALIDATION);
      return;
    }

    this.loading = true;
    let data = Object.assign(this.form.value,{Indicators:this.indicatorsForm.value.tableRows});
    if (this.isAddMode) {
      this.createRecord(data);
    } else {
      this.updateRecord(data);
    }
  }

  private createRecord(data) {
    this.dataService.create(data)
      .pipe(first())
      .subscribe(() => {
        this.toastr.success(Constants.Messages.SAVE_SUCCESS,Constants.Title.RECORD_OPERATION);
        this.router.navigate([this.parentUrl]);
      },err=>{
        this.errorMessage = err.message? err.message : Constants.Messages.UPDATE_FAILURE;
        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
      })
      .add(() => {this.loading = false});
  }

	private updateRecord(data) {
	    this.dataService.update(this.id, data)
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
	addRow() {
		const control =  this.indicatorsForm.get('tableRows') as FormArray;
		control.push(this.formBuilder.group({
	  		IndicatorName: ['',Validators.required],
	  		MeasurementUnit: ['',Validators.required],
	  		QualitativeQuantitative: ['',Validators.required],
	  		ActivityOrResult:['',Validators.required],
	  		Description: [''],
	        isEditable: [true]
		}));
	}
	deleteRow(index: number) {
	  	const control =  this.indicatorsForm.get('tableRows') as FormArray;
	  	control.removeAt(index);
	}
	get itb() {
	    const control = this.indicatorsForm.get('tableRows') as FormArray;
	    return control;
	}

  	get f() { return this.form.controls; }
}
