import { Component, OnInit } from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Constants} from "../../../../_helpers/constants";
import {first} from "rxjs/operators";
import {UserService} from "../../../../_services/user.service";
import {ProgrammeService} from "../../../../_services/programme.service";

@Component({
  selector: 'app-add-programme',
  templateUrl: './add-programme.component.html',
  styleUrls: ['./add-programme.component.css']
})
export class AddProgrammeComponent implements OnInit {

  pk: string = 'id';
  title: string;
  object: string = 'Programmes';
  parentUrl: string = '/activity-tracker/programmes';
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  userManagers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: ProgrammeService,
    private toastr: ToastrService,
    private constants: Constants,
    private userService: UserService
  ) {}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.title = (this.isAddMode? 'Add' : 'Edit') + ' ' + this.object;
    this.userService.getAllByType(Constants.UserTypes.manager.name).subscribe(data=>{this.userManagers = data});

    this.form = this.formBuilder.group({
      ManagerID: ['', Validators.required],
      ProgrammeName: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
	});


    if (!this.isAddMode) {
      this.dataService.get(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.form.patchValue({'StartDate': (x.StartDate? new Date (x.StartDate) : null)});
          this.form.patchValue({'EndDate': (x.EndDate? new Date (x.EndDate) : null)});
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

  onDateChange($event){
	  let StartDate = this.form.get('StartDate').value;
	  let EndDate = this.form.get('EndDate').value;

	  if(StartDate && EndDate && StartDate>=EndDate){

		  this.toastr.error(Constants.Messages.ERROR_DATE_RANGE,Constants.Title.FORM_VALIDATION);
		  this.form.patchValue({'EndDate':null});
	  }
  }

  private createRecord() {
    this.dataService.create(this.form.value)
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

  get f() { return this.form.controls; }
}
