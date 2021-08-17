import {ElementSelectionService} from './../element-selection.service';
import {ComponentInspectorService} from './../component-inspector.service';
import { Component, OnInit, Directive, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Constants } from '../_helpers/constants';
import { Functions } from '../_helpers/functions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
	  
	  this.form = this.formBuilder.group({
          Channel: ['sms', Validators.required],
          email: ['', [ Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          PhoneNo: ['+254',[]]
      });
  }

  onSubmit(): void {  
	this.submitted = true;
	
    /* stop here if form is invalid */
    if (this.form.invalid) {
    	Functions.alertError(Constants.Title.FORM_VALIDATION,Constants.Messages.FORM_ERROR_FOUND);
        return;
    }
 
    this.authService.resetPassword(this.form.value,this.form.value.Channel).subscribe(
      data => {        
        this.toastr.success(Constants.Messages.PASSWORD_RESET_SUCCESS,Constants.Title.PASSWORD_RESET);
        this.router.navigate(['login']);
      },
      err => { 
    	this.errorMessage = err && err.error && err.error.message? err.error.message : Constants.Messages.PASSWORD_RESET_FAILURE;
        this.toastr.error(this.errorMessage,Constants.Title.PASSWORD_RESET);
      }
    );    
  }
  
  get f() { return this.form.controls; }
}
