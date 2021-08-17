import {ElementSelectionService} from './../../../../element-selection.service';
import {ComponentInspectorService} from './../../../../component-inspector.service';
import {TokenStorageService} from './../../../../_services/token-storage.service';
import {MemberCategoryService} from './../../../../_services/member-category.service';
import {TransactionService} from './../../../../_services/transaction.service';
import {AssociateMemberService} from './../../../../_services/associate-member.service';
import {IndividualMemberService} from './../../../../_services/individual-member.service';
import {GroupMemberService} from './../../../../_services/group-member.service';
import {MemberService} from './../../../../_services/member.service';
import {MemberTypeService} from './../../../../_services/member-type.service';
import {Constants} from './../../../../_helpers/constants';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgWizardStep } from '@cmdap/ng-wizard';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import {Functions} from './../../../../_helpers/functions';
import { AbstractControlOptions, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-other-detail',
  templateUrl: './add-other-detail.component.html',
  styleUrls: ['./add-other-detail.component.css']
})
export class AddOtherDetailComponent extends NgWizardStep implements OnInit {

	constructor(public __elementSelectionService:ElementSelectionService,private __componentInspectorService:ComponentInspectorService) { this.__componentInspectorService.getComp(this); }memberType: any = Constants.MemberTypes.individual.value;
	associateManagerForm: FormGroup;
	groupMemberForm: FormGroup;
	dataService: any;

	pk: string = 'id';
	title: string;
	object: string = 'Member';
	parentUrl: string = '/members';

	id: string;
	isAddMode: boolean;
	loading: boolean = false;
	submitted: boolean = false;
	errorMessage: string = '';

	memberCategories: any[] = [];
  	
	constructor(
			private groupMemberService: GroupMemberService,
			private individualMemberService: IndividualMemberService,
			private associateMemberService: AssociateMemberService,
			private memberCategoryService: MemberCategoryService,
			private memberService: MemberService,
			private formBuilder: FormBuilder,
			private toastr: ToastrService,
			private memberTypeService: MemberTypeService,
			private transactionService: TransactionService,
			private route: ActivatedRoute,
			public tokenService: TokenStorageService,
			private router: Router){
		super();
	}

  	ngOnInit(): void {	
  		this.id = this.route.parent.snapshot.params['id'];
	    this.isAddMode = !this.id;
	    this.title = (this.isAddMode? 'Add' : 'Edit') + ' ' + this.object;
	    let firstStepPath = this.isAddMode? 'members/register' : 'members/edit/' + this.id;
	    
	    if(this.isAddMode && !this.memberService.formValues.TypeID){
			this.router.navigate([firstStepPath]);
		}
  		
  		this.memberType = this.memberService.selectedMemberType || this.memberType;
  		this.memberCategoryService.getAll().subscribe(data=>{this.memberCategories = data});
  		
  		if(this.memberType==Constants.MemberTypes.group.value){
  			this.groupMemberForm = this.formBuilder.group({
  				CompleteSignup: [true],
  				tableRows: this.formBuilder.array([])
	  	    }); 
  	  		
  			if(!this.memberService.formValues.members) {
  				this.addGroupMemberRow();
  			}
  			else{
	  	  		for(let i=0; i<this.memberService.formValues.members.length;i++){
	  	  			this.addGroupMemberRow();  	  			
		  	  	}	  	 
	  	  		this.groupMemberForm.patchValue({tableRows:this.memberService.formValues.members});
  			}
  	  		this.dataService = this.groupMemberService;
  		}  		
  		else if(this.memberType==Constants.MemberTypes.associate.value){
  	  	  	this.associateManagerForm = this.formBuilder.group({
  	  	  		tableRows: this.formBuilder.array([])	
  	  	    });  
  	  		
  	  		if(!this.memberService.formValues.managers) {
				this.addAssociateManagerRow();
			}
			else{
	  	  		for(let i=0; i<this.memberService.formValues.managers.length;i++){
	  	  			this.addAssociateManagerRow();  	  			
		  	  	}
	  	  		this.associateManagerForm.patchValue({tableRows:this.memberService.formValues.managers});
			}			
						  		
  	  		this.dataService = this.associateMemberService;  	  		
  		}
  		else{
  			this.dataService = this.individualMemberService;
  		}
  	}
  	
  	wsIsValid() {
  		let form;  		
  		if(this.memberType==Constants.MemberTypes.group.value){
  			form = this.groupMemberForm;
  		}else if(this.memberType==Constants.MemberTypes.associate.value){
  			form = this.associateManagerForm;
  		}  	
  		else{
  			return true;
  		}
  		
  		form.markAllAsTouched();
		if (form.invalid) {
	    	this.toastr.error(Constants.Messages.FORM_ERROR_FOUND,Constants.Title.FORM_VALIDATION);
	        return false;
	    }	
		
		return form.valid;
	}
  	
	onSubmit() {
		if(this.memberType==Constants.MemberTypes.group.value){
			this.memberService.setFormValues({members:this.groupMemberForm.value?.tableRows});
		}
		if(this.memberType==Constants.MemberTypes.associate.value){
			this.memberService.setFormValues({managers:this.associateManagerForm.value?.tableRows});
		}	
				
		/* save the new member here and redirect to listing page */		
	    this.loading = true;
	    if (this.isAddMode) {
	        this.createRecord();
	    } else {
	        this.updateRecord();
	    }
	}	
	

	private createRecord() {
	    this.dataService.create(this.memberService.formValues)
	        .pipe(first())
	        .subscribe(() => {
	        	this.memberService.formValues = {};
	        	this.toastr.success(Constants.Messages.SAVE_SUCCESS,Constants.Title.RECORD_OPERATION);
	            this.router.navigate([this.parentUrl]);
	        },err=>{
	        	this.errorMessage = Functions.handleError(err,Constants.Messages.UPDATE_FAILURE);
	            this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
	        })
	        .add(() => {this.loading = false});
	}

	private updateRecord() {
	    this.dataService.update(this.id, this.memberService.formValues)
	        .pipe(first())
	        .subscribe(() => {
	        	/* dispatch mpesa payment request to member's phone */	        	
	        	this.mpesaRequest();
	        	this.memberService.formValues = {};
	        	this.toastr.success(Constants.Messages.UPDATE_SUCCESS,Constants.Title.RECORD_OPERATION);
	        	this.router.navigate([this.parentUrl]);
	        },err=>{
	        	this.errorMessage = Functions.handleError(err,Constants.Messages.SAVE_FAILURE);
	            this.toastr.error(this.errorMessage,Constants.Title.RECORD_OPERATION);
	        })
	        .add(() => {this.loading = false});
	}
	
	public mpesaRequest(){
		if(this.tokenService.getUserType()=='member' && !this.tokenService.getCompleteSignup()){
	    	let PhoneNo: any = this.memberService.formValues.PhoneNo;
	        let AccountRef: any = this.memberService.formValues.IdDocumentNumber || 
	        		this.memberService.formValues.RegistrationNumber || PhoneNo;
	    	let CategoryID: any = this.memberService.formValues.CategoryID;
	    	let category: any = this.memberCategories.filter(obj => obj.CategoryID ===CategoryID);
	    	let Amount: number = category.Fees || 0;	        
	    	
	    	this.transactionService.stkPush(PhoneNo,Amount,AccountRef);
	    	this.tokenService.setCompleteSignup(true);
		}
	}
	
	addGroupMemberRow() {
		const control =  this.groupMemberForm.get('tableRows') as FormArray;
		control.push(this.formBuilder.group({
    		FullName: ['',Validators.required],
    		IdDocumentNumber: ['',Validators.required],
    		PhoneNo: ['',Validators.required],
            isEditable: [true]
        }));    	
  	}
	addAssociateManagerRow() {
		const control =  this.associateManagerForm.get('tableRows') as FormArray;		
		control.push(this.formBuilder.group({
    		FullName: ['',Validators.required],
    		Position: ['',Validators.required],
    		PhoneNo: ['',Validators.required],
    		email: [''],        
            isEditable: [true]
        }));
  	}
	deleteRow(table: any, index: number) {
    	const control =  table.get('tableRows') as FormArray;
    	control.removeAt(index);
  	}  	
  	get mgc() {
  	    const control = this.associateManagerForm.get('tableRows') as FormArray;
  	    return control;
	}  	
  	get mmc() {
  	    const control = this.groupMemberForm.get('tableRows') as FormArray;
  	    return control;
	}
}
