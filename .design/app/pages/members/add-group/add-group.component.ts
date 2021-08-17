import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import {CropsService} from './../../../_services/crops.service';
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
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})

export class AddGroupComponent implements OnInit {

	form: FormGroup;
  	countyList:{name:string, code:string}[] = counties;
  	selectedCounty: any = {};
  	crops: any[] = [];
  	serviceCategories: any[] = [];
  	
	constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

		private memberService:MemberService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService,
		private constants: Constants,
		private serviceCategoryService: ServiceCategoryService,
		private cropsService: CropsService) {this.__componentInspectorService.getComp(this);
 }

  	ngOnInit(): void {
  		this.serviceCategoryService.getAll().subscribe(data=>{this.serviceCategories = data});
  		this.cropsService.getAll().subscribe(data=>{this.crops = data});
  		
		let today = (new Date(Date.now()));
		let username = 'MB/' + Functions.randomNumber(4) + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
	    
		
	}
}
