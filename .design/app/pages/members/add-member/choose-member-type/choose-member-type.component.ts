import {ElementSelectionService} from './../../../../element-selection.service';
import {ComponentInspectorService} from './../../../../component-inspector.service';
import {MemberTypeService} from './../../../../_services/member-type.service';
import {MemberService} from './../../../../_services/member.service';
import {Constants} from './../../../../_helpers/constants';
import { NgWizardStep } from '@cmdap/ng-wizard';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-choose-member-type',
  templateUrl: './choose-member-type.component.html',
  styleUrls: ['./choose-member-type.component.css']
})
export class ChooseMemberTypeComponent extends NgWizardStep implements OnInit {

	constructor(public __elementSelectionService:ElementSelectionService,private __componentInspectorService:ComponentInspectorService) { this.__componentInspectorService.getComp(this); }memberTypes: any[] = [];
	form: FormGroup;
	selected: any = {};

	constructor(
			private memberService: MemberService,
			private formBuilder: FormBuilder,
			private toastr: ToastrService,
			private memberTypeService: MemberTypeService) { 
		super();
	}
  
  	ngOnInit(): void {
		this.memberTypeService.getAll().subscribe(data=>{this.memberTypes = data});
		this.form = this.formBuilder.group({
			TypeID: ['', Validators.required]
		});
		this.form.patchValue(this.memberService.formValues);
		this.selectOption(this.memberService.formValues.TypeID);
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
		let obj = this.memberTypes.filter(obj => obj.TypeID ===id);
		this.selected = obj.length > 0 ? obj[0] : {};
		this.memberService.selectedMemberType = this.selected.Title? this.selected.Title.toLowerCase() : null;
		this.form.patchValue({'TypeID':this.selected.TypeID});
	}
	
	get f() { return this.form.controls; }
}
