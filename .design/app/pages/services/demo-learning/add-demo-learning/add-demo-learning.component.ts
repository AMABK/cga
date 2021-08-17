import {ElementSelectionService} from './../../../../element-selection.service';
import {ComponentInspectorService} from './../../../../component-inspector.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import counties from "../../../../../assets/json/counties.json";
import {ActivatedRoute, Router} from "@angular/router";
import {InputService} from "../../../../_services/input.service";
import {ToastrService} from "ngx-toastr";
import {Constants} from "../../../../_helpers/constants";
import {Functions} from "../../../../_helpers/functions";
import {TokenStorageService} from "../../../../_services/token-storage.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-add-demo-learning',
  templateUrl: './add-demo-learning.component.html',
  styleUrls: ['./add-demo-learning.component.css']
})
export class AddDemoLearningComponent implements OnInit {

  pk: string = 'id';
  title: string;
  object: string = 'Demo & Learning';
  parentUrl: string = '/services/demo-learning';
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  countyList:{name:string, code:string}[] = counties;
  selectedCounty: any = {};

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: InputService,
    private toastr: ToastrService,
    private constants: Constants,
    public functions: Functions,
    public tokenService: TokenStorageService
  ) {this.__componentInspectorService.getComp(this);
}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.title = (this.isAddMode? 'Add' : 'Edit') + ' ' + this.object;
    let today = (new Date(Date.now()));
    let AgentID = this.tokenService.getUserType() === Constants.UserTypes.agripreneur.name? this.tokenService.getUsername() : '' ;
    let AgriBusinessCoordinatorID = this.tokenService.getUserType() === Constants.UserTypes.agricoordinator.name? this.tokenService.getUsername() : '' ;

    this.form = this.formBuilder.group({
      AgriBusinessCoordinatorID: [AgriBusinessCoordinatorID, Validators.required],
      County: ['', Validators.required],
      Subcounty: [''],
      Ward: [''],
      FarmerGroup: [''],
      ActivityDate: [today, Validators.required],
      FarmerName: ['', Validators.required],
      AgentID: [AgentID, Validators.required],
      FarmerPhone: ['+254', Validators.required],
      FarmerGender: [''],
      CropID: ['', Validators.required],
      DemoTreatment: ['', Validators.required],
      GerminationPercent: ['', Validators.required],
      AreaPlanted: ['', Validators.required],
      SeedVarietyUsed: ['', Validators.required],
      SeedQuantityUsed: ['', Validators.required],
      FertilizerTypeUsed: ['', Validators.required],
      FertilizerQuantity: [0, Validators.required],
      HarvestDate: [today, Validators.required],
      QuantityHarvested: [0, Validators.required],
      RemarksCropCondition: ['', Validators.required],
      DemoActivitiesConducted: ['', Validators.required]
    });
    if (!this.isAddMode) {
      this.dataService.get(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.onCountyChange(x.County);
          this.toastr.success(Constants.Messages.RECORD_LOADED,Constants.Title.RECORD_OPERATION);
        },err=>{
          this.errorMessage = err.message? err.message : Constants.Messages.RECORDS_NOT_FOUND;
          this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
  }
  onCountyChange(name:any){
    let county = this.countyList.filter(cntry => cntry.name ===name);
    this.selectedCounty = county.length > 0 ? county[0] : {}
  }
  onUnitChange(){
    let quantity = Number(this.form.get('Quantity').value);
    let unitPrice = Number(this.form.get('UnitPrice').value);
    let total = quantity * unitPrice;
    this.form.patchValue({TotalValue: total});
  }
  onSubmit() {
    console.log(this.form.value);
    this.submitted = true;
    /* stop here if form is invalid */
    if (this.form.invalid) {
      this.toastr.error(Constants.Messages.FORM_ERROR_FOUND,Constants.Title.FORM_VALIDATION);
      console.log(this.form.errors);
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
