import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import {BusinessCategoryService} from './../../../_services/business-category.service';
import {ServiceCategoryService} from './../../../_services/service-category.service';
import {MemberService} from './../../../_services/member.service';
import { Component, OnInit, Input } from '@angular/core';
import {Constants} from './../../../_helpers/constants';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Functions} from './../../../_helpers/functions';
import { ToastrService } from 'ngx-toastr';
import counties from '../../../../assets/json/counties.json';

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css']
})

export class AddAssociateComponent implements OnInit {
	@Input() form: FormGroup;
	
  	countyList:{name:string, code:string}[] = counties;
  	selectedCounty: any = {};
  	businessCategories: any[] = [];
  	serviceCategories: any[] = [];
  	
	constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

		private memberService:MemberService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService,
		private constants: Constants,
		private serviceCategoryService: ServiceCategoryService,
		private businessCategoryService: BusinessCategoryService) {this.__componentInspectorService.getComp(this);
 }

  	ngOnInit(): void {
  		this.serviceCategoryService.getAll().subscribe(data=>{this.serviceCategories = data});
  		this.businessCategoryService.getAll().subscribe(data=>{this.businessCategories = data});
  		
		let today = (new Date(Date.now()));
		let username = 'MB/' + Functions.randomNumber(4) + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
	    
		this.form = this.formBuilder.group({
			username: [username, Validators.required],
			FullName: ['', Validators.required],
			RegistrationDate: ['', Validators.required],
			RegistrationNumber: ['', Validators.required],
			DateCreated: [today, Validators.required],
			email: ['', [Validators.required, Validators.email]],
			PhoneNo: ['+254', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
			Counties: ['', Validators.required],
			ServiceCategoryID: ['', Validators.required],
			BusinessCategory: ['', Validators.required],			
			ApproxAnnualTurnOver: ['', Validators.required],
			Location: ['', Validators.required],
		});
	}
}
