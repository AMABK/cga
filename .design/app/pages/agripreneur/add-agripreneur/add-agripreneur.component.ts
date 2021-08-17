import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import {AgripreneurService} from './../../../_services/agripreneur.service';
import {Constants} from './../../../_helpers/constants';
import {Functions} from './../../../_helpers/functions';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import counties from '../../../../assets/json/counties.json';
import {SpaceCategoryService} from "../../../_services/space-category.service";
import {FarmersServedService} from "../../../_services/farmers-served.service";
import {ServiceCategoryService} from "../../../_services/service-category.service";

@Component({
  selector: 'app-add-agripreneur',
  templateUrl: './add-agripreneur.component.html',
  styleUrls: ['./add-agripreneur.component.css']
})
export class AddAgripreneurComponent implements OnInit {

  pk: string = 'id';
  title: string;
  object: string = 'Agripreneur';
  parentUrl: string = '/agripreneurs';
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;

  countyList:{name:string, code:string}[] = counties;
  selectedCounty: any = {};
  spaceCategories: any[] = [];
  serviceCategories : any[] = [];
  farmersServed: any[] = [];

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: AgripreneurService,
    private toastr: ToastrService,
    private constants: Constants,
    private spaceCategoryService: SpaceCategoryService,
    private farmersServedService: FarmersServedService,
    private serviceCategoryService: ServiceCategoryService
  ) {this.__componentInspectorService.getComp(this);
}


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.title = (this.isAddMode? 'Add' : 'Edit') + ' ' + this.object;

    this.spaceCategoryService.getAll().subscribe(data=>{this.spaceCategories = data});
    this.farmersServedService.getAll().subscribe(data=>{this.farmersServed = data});
    this.serviceCategoryService.getAll().subscribe(data=>{this.serviceCategories = data});

    const formOptions: AbstractControlOptions = { };
    let today = (new Date(Date.now()));
    let username = 'AP/' + Functions.randomNumber(4) + '/' + (today.getMonth()+1) + '/' + today.getFullYear();

    this.form = this.formBuilder.group({
      Title: ['', Validators.required],
      username: [username, Validators.required],
      FullName: ['', Validators.required],
      Gender: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      RegistrationDate: [today, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      PhoneNo: ['254', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
      County: ['', Validators.required],
      Subcounty: ['', Validators.required],
      Ward: ['', Validators.required],
      SpaceCategoryID: ['', Validators.required],
      ServiceCategoryID: ['', Validators.required],
      FarmersServed: ['', Validators.required],
      AgroDealer: [''],
      AggregatorBuyer: [''],
      MechanizationProvider: [''],
      FinancialProvider: [''],
    }, formOptions);

    if (!this.isAddMode) {
      this.dataService.get(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.onCountyChange(x.County);
          this.form.patchValue({'DateOfBirth':new Date (x.DateOfBirth)});
          this.form.patchValue({'RegistrationDate':new Date (x.RegistrationDate)});
          this.toastr.success(Constants.Messages.RECORD_LOADED,Constants.Title.RECORD_OPERATION);
        },err=>{
          this.errorMessage = Functions.handleError(err,Constants.Messages.RECORDS_NOT_FOUND);
          this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
  }

  onCountyChange(name:any){
    let county = this.countyList.filter(cntry => cntry.name ===name);
    this.selectedCounty = county.length > 0 ? county[0] : {}
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
    	this.errorMessage = Functions.handleError(err,Constants.Messages.SAVE_FAILURE);
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
    	this.errorMessage = Functions.handleError(err,Constants.Messages.UPDATE_FAILURE);
        this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
      })
      .add(() => {this.loading = false});
  }

  get f() { return this.form.controls; }

}
