import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import {MustMatch} from './../../../_helpers/must-match.validator';
import {AuthService} from './../../../_services/auth.service';
import {Functions} from './../../../_helpers/functions';
import {Constants} from './../../../_helpers/constants';
import { Component, OnInit, Directive, Renderer2, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})


@Directive({
  selector: 'body'
})

export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;
  codeSent: boolean = false;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
private renderer: Renderer2, 
		  private elmRef: ElementRef, 
		  private authService: AuthService,
		  private toastr: ToastrService,
		  private router: Router,
		  private formBuilder: FormBuilder) {this.__componentInspectorService.getComp(this);
 }

  ngOnInit(): void {
	//add custom class to register body component page
	  this.renderer.addClass(this.elmRef.nativeElement, 'register-page');
	  
	  const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'ConfirmPassword') };
	
	  this.form = this.formBuilder.group({
          Channel: ['sms', Validators.required],
          email: ['', [ Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          PhoneNo: ['254',[]],
          password: ['', [Validators.minLength(8),Validators.required]],
	      ConfirmPassword: ['',Validators.required],
	      ResetCode: ['',Validators.required],
      },formOptions);
  }

  resetCode(): void {  
	this.submitted = true;
	
    /* stop here if form is invalid */
    if (!this.form.get('Channel').value || 
    	(this.form.get('Channel').value=='sms' && !this.form.get('PhoneNo').value) || 
    	(this.form.get('Channel').value=='email' && !this.form.get('email').value) ) {
    	
    	this.toastr.error(Constants.Messages.FORM_ERROR_FOUND,Constants.Title.FORM_VALIDATION);
        return;
        
    }
 
    this.codeSent = false;
    this.authService.resetCode(this.form.value,this.form.value.Channel).subscribe(
      data => {        
    	let recipient = (this.form.get('Channel').value=='sms')? this.form.value.PhoneNo : this.form.value.email; 
    	this.codeSent = true;
    	this.submitted = false;
        this.toastr.success(Constants.Messages.PASSWORD_RESET_SUCCESS + recipient,Constants.Title.PASSWORD_RESET); 
      },
      err => { 
    	this.errorMessage = Functions.handleError(err,Constants.Messages.PASSWORD_RESET_FAILURE);
        this.toastr.error(this.errorMessage,Constants.Title.PASSWORD_RESET);
      }
    );    
  }
  
  changePassword(): void {  
	this.submitted = true;
	
    /* stop here if form is invalid */
    if (this.form.invalid) {
    	Functions.alertError(Constants.Title.FORM_VALIDATION,Constants.Messages.FORM_ERROR_FOUND);
        return;
    }
 
    this.authService.changePassword(this.form.value,this.form.value.Channel).subscribe(
      data => {        
    	this.codeSent = false;
        this.toastr.success(Constants.Messages.PASSWORD_CHANGE_SUCCESS,Constants.Title.PASSWORD_RESET);        
        this.router.navigate([this.authService.lockPath]);
      },
      err => { 
    	this.errorMessage = Functions.handleError(err,Constants.Messages.PASSWORD_RESET_FAILURE);
        this.toastr.error(this.errorMessage,Constants.Title.PASSWORD_RESET);
      }
    );    
  }
  
  get f() { return this.form.controls; }
}
