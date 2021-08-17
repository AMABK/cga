import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import {MemberService} from './../../../_services/member.service';
import { Component, OnInit } from '@angular/core';
import {MemberTypeService} from './../../../_services/member-type.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgWizardStep } from '@cmdap/ng-wizard';

@Component({
  selector: 'app-add-other-detail',
  templateUrl: './add-other-detail.component.html',
  styleUrls: ['./add-other-detail.component.css']
})
export class AddOtherDetailComponent extends NgWizardStep implements OnInit {

	constructor(public __elementSelectionService:ElementSelectionService,private __componentInspectorService:ComponentInspectorService) { this.__componentInspectorService.getComp(this); }memberTypes: any[] = [];
	memberType: any = null;
  	
	constructor(
			private memberTypeService: MemberTypeService,
			private memberService: MemberService,
			private router: Router) { 
		super();
	}

  	ngOnInit(): void {	    
  		if(!this.memberService.formValues.TypeID){
			this.router.navigate(['members/registration/membership-type']);
		}
    	this.memberTypeService.getAll().subscribe(data=>{
	    	this.memberTypes = data; 
	    	let obj = this.memberTypes.filter(obj => obj.TypeID ===this.memberService.formValues.TypeID);
	    	let selected = obj.length > 0 ? obj[0] : {};
			this.memberType = selected.Title? selected.Title.toLowerCase().trim() : null; 
		});
  	}
  	
  	wsIsValid() {
		//this.form.get('CategoryID').markAsTouched(); 
	    if (this.form.invalid) {
	    	this.toastr.error(Constants.Messages.SELECT_OPTION,Constants.Title.FORM_VALIDATION);
	        return false;
	    }
		return this.form.valid;
	}
	wsOnNext() {
		this.memberService.setFormValues(this.form.value);
	}
	
}
