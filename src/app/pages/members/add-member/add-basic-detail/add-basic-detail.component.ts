import {BusinessCategoryService} from './../../../../_services/business-category.service';
import {CropsService} from './../../../../_services/crops.service';
import {ServiceCategoryService} from './../../../../_services/service-category.service';
import {MemberService} from './../../../../_services/member.service';
import {MemberTypeService} from './../../../../_services/member-type.service';
import {Constants} from './../../../../_helpers/constants';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgWizardStep } from '@cmdap/ng-wizard';
import { ToastrService } from 'ngx-toastr';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Functions} from './../../../../_helpers/functions';
import counties from '../../../../../assets/json/counties.json';
import _ from 'lodash';

@Component({
  selector: 'app-add-basic-detail',
  templateUrl: './add-basic-detail.component.html',
  styleUrls: ['./add-basic-detail.component.css']
})
export class AddBasicDetailComponent extends NgWizardStep implements OnInit {

	pk: string = 'id';
	title: string;
	object: string = 'Member';
	parentUrl: string = '/members';

	id: string;
	isAddMode: boolean;
	loading: boolean = false;
	errorMessage: string = '';

	form: FormGroup;
	submitted: boolean = false;
	memberType: any = Constants.MemberTypes.individual.value;

	countyList:{name:string, code:string}[] = counties;
	selectedCounty: any = {};
	businessCategories: any[] = [];
	serviceCategories: any[] = [];
	crops: any[] = [];
	memberTypes: any[] = [];

  constructor(
		private memberService: MemberService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService,
		private memberTypeService: MemberTypeService,
		private router: Router,
		private route: ActivatedRoute,
		public constants: Constants,
		private serviceCategoryService: ServiceCategoryService,
		private businessCategoryService: BusinessCategoryService,
		private cropsService: CropsService) {
	  super();
  }

	ngOnInit(): void {
		/* obtain id from route then use it to determine whether in add or edit mode */
		this.id = this.route.parent.snapshot.params['id'];
	    this.isAddMode = !this.id;
	    this.title = (this.isAddMode? 'Add' : 'Edit') + ' ' + this.object;
	    let firstStepPath = this.isAddMode? 'members/register' : 'members/edit/' + this.id;

	    /* member type has not been set, so we go to the first stage */
		if(this.isAddMode && !this.memberService.formValues.TypeID){
			this.router.navigate([firstStepPath]);
		}

	    /* set member type and current dates */
		this.memberType = this.memberService.selectedMemberType || this.memberType;
	  	let today = (new Date(Date.now()));

	  	/* generate a username based on a random number, month and year */
		let username = 'CGA/' + Functions.randomNumber(4) + '/' + (today.getMonth()+1) + '/' + today.getFullYear();

	  	/* get service categories and assign them to instance variables */
		this.serviceCategoryService.getAll().subscribe(data=>{this.serviceCategories = data});
	  	
		/* get service types and assign them to instance variables */
		this.memberTypeService.getAll().subscribe(data=>{this.memberTypes = data});

	  	/* initialize the form inputs according the selected member type = group */
	  	if(this.memberType==Constants.MemberTypes.group.value){
	  		this.cropsService.getAll().subscribe(data=>{this.crops = data});

	  		this.form = this.formBuilder.group({
				username: [username, Validators.required],
				FullName: ['', Validators.required],
				RegistrationDate: ['', Validators.required],
				RegistrationNumber: ['', Validators.required],
				DateCreated: [today, Validators.required],
				email: ['', [Validators.required, Validators.email]],
				PhoneNo: ['254', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
				County: [''],
				Prefix: [''],
				Subcounty: [''],
				Ward: [''],
				ServiceCategoryID: ['', Validators.required],
				CropsFarmed: ['', Validators.required],
				Location: ['']
			});
	  	}

	  	/* initialize the form inputs according the selected member type = associate */
	  	else if(this.memberType==Constants.MemberTypes.associate.value){
	  		this.businessCategoryService.getAll().subscribe(data=>{this.businessCategories = data});

			this.form = this.formBuilder.group({
				username: [username, Validators.required],
				FullName: ['', Validators.required],
				RegistrationDate: ['', Validators.required],
				RegistrationNumber: ['', Validators.required],
				DateCreated: [today, Validators.required],
				email: ['', [Validators.required, Validators.email]],
				PhoneNo: ['254', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
				Counties: ['', Validators.required],
				Prefix: [''],
				ServiceCategoryID: ['', Validators.required],
				BusinessCategoryID: ['', Validators.required],
				ApproxAnnualTurnOver: ['', Validators.required],
				Location: ['', Validators.required],
			});
	  	}
	  	/* initialize the form inputs according the selected member type = individual */
	  	else{
	  		this.cropsService.getAll().subscribe(data=>{this.crops = data});

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
				Prefix: [''],
				Ward: ['', Validators.required],
				IdDocumentNumber: ['', Validators.required],
				ServiceCategoryID: ['', Validators.required],
				CropsFarmed: ['', Validators.required],
				Location: ['']
			});
	  	}

		/* fetch records from database if member already exists then add them to form */
	    if (!this.isAddMode) {
	        this.memberService.get(this.id)
	            .pipe(first())
	            .subscribe(x => {

	            	this.memberService.setFormValues(x);
	            	if(!this.memberService.formValues.TypeID){
	        			this.router.navigate(['members/edit/' + this.id + '/membership-type']);
	        		}

					this.form.patchValue(x);
					this.form.patchValue({'DateCreated':(x.DateCreated? new Date (x.DateCreated) : null)});
					this.form.patchValue({'RegistrationDate':(x.RegistrationDate? new Date (x.RegistrationDate) : null)});

					if(this.memberType==Constants.MemberTypes.individual.value){
						this.form.patchValue({'DateOfBirth':(x.DateOfBirth? new Date (x.DateOfBirth) : null)});
					}

					this.onCountyChange(this.memberService.formValues?.County);

					this.toastr.success(Constants.Messages.RECORD_LOADED,Constants.Title.RECORD_OPERATION);
				},err=>{
					this.errorMessage = Functions.handleError(err,Constants.Messages.RECORDS_NOT_FOUND);
	                this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
	                this.router.navigate(['members']);
		        });
	    }
	}

	wsIsValid() {
		this.form.markAllAsTouched();
		this.submitted = true;
	    if (this.form.invalid) {
	    	this.toastr.error(Constants.Messages.FORM_ERROR_FOUND,Constants.Title.FORM_VALIDATION);
	        return false;
	    }
		return this.form.valid;
	}

	wsOnNext() {
		let t: any[] = this.memberTypes.filter(a => a.TypeID ===this.memberService.formValues.TypeID);
		let TypeCode:any = t[0].Code;
		let countyCode = (TypeCode=='A')? '' : _.padStart(this.selectedCounty.code+'',3,'0');
		let Prefix: any = 'CGA/' + TypeCode + countyCode;
		this.form.patchValue({Prefix:Prefix}); 
		this.memberService.setFormValues(this.form.value);
	}

	onCountyChange(name:any){
		let county = this.countyList.filter(cntry => cntry.name ===name);
		this.selectedCounty = county.length > 0 ? county[0] : {}		
	}

	get f() { return this.form.controls; }

}
