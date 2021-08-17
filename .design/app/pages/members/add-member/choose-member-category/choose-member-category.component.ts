import {ElementSelectionService} from './../../../../element-selection.service';
import {ComponentInspectorService} from './../../../../component-inspector.service';
import {MemberCategoryService} from './../../../../_services/member-category.service';
import {MemberService} from './../../../../_services/member.service';
import {Constants} from './../../../../_helpers/constants';
import { Component, OnInit } from '@angular/core';
import { NgWizardStep } from '@cmdap/ng-wizard';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-choose-member-category',
  templateUrl: './choose-member-category.component.html',
  styleUrls: ['./choose-member-category.component.css']
})
export class ChooseMemberCategoryComponent extends NgWizardStep implements OnInit{

	constructor(public __elementSelectionService:ElementSelectionService,private __componentInspectorService:ComponentInspectorService) { this.__componentInspectorService.getComp(this); }memberCategories: any[] = [];
	form: FormGroup;
	selected: any = {};

	constructor(
			public memberService: MemberService,
			private formBuilder: FormBuilder,
			private toastr: ToastrService,
			private memberCategoryService: MemberCategoryService,
			private router: Router){
		super();
	}

	ngOnInit(): void {
		if(!this.memberService.formValues.TypeID){
			this.router.navigate(['members/registration/membership-type']);
		}
		this.memberCategoryService.getAll().subscribe(data=>{this.memberCategories = data});
		this.form = this.formBuilder.group({
			CategoryID: [null, Validators.required]
		});
		this.form.patchValue(this.memberService.formValues);
		this.selectOption(this.memberService.formValues.CategoryID);
	}
	wsIsValid() {
		this.form.markAllAsTouched();
	    if (this.form.invalid) {
	    	this.toastr.error(Constants.Messages.SELECT_OPTION,Constants.Title.FORM_VALIDATION);
	        return false;
	    }
		return this.form.valid;
	}
	wsOnNext() {
		this.memberService.setFormValues(this.form.value);
	}

	selectOption(id:any){
		let obj = this.memberCategories.filter(obj => obj.CategoryID ===id);
		this.selected = obj.length > 0 ? obj[0] : {};
		this.form.patchValue({'CategoryID':this.selected.CategoryID});
	}

	get f() { return this.form.controls; }
}
