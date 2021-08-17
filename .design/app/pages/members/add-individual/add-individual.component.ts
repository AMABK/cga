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
  selector: 'app-add-individual',
  templateUrl: './add-individual.component.html',
  styleUrls: ['./add-individual.component.css']
})

export class AddIndividualComponent implements OnInit {

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
  		
	}
}
