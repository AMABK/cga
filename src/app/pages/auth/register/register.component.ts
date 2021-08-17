import {AuthService} from './../../../_services/auth.service';
import {Functions} from './../../../_helpers/functions';
import {Constants} from './../../../_helpers/constants';
import { Component, OnInit, Directive, Renderer2, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


@Directive({
  selector: 'body'
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(private renderer: Renderer2, 
		  private elmRef: ElementRef, 
		  private authService: AuthService,
		  private toastr: ToastrService,
		  private router: Router,
		  private formBuilder: FormBuilder) { 
	  
  }

  ngOnInit(): void {
	  //add custom class to register body component page
	  this.renderer.addClass(this.elmRef.nativeElement, 'register-page');
	  
	  this.form = this.formBuilder.group({
          FullName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          PhoneNo: ['254', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
          Channel: ['', Validators.required],
      });
  }

  onSubmit(): void {  
	this.submitted = true;
    /* stop here if form is invalid */
    if (this.form.invalid) {
    	Functions.alertError(Constants.Title.FORM_VALIDATION,Constants.Messages.FORM_ERROR_FOUND);
        return;
    }
 
    this.authService.register(this.form.value, Constants.UserTypes.member.name).subscribe(
      data => {        
        this.toastr.success(Constants.Messages.SIGNUP_SUCCESS,Constants.Title.SIGNUP);
        this.router.navigate([this.authService.loginPath]);
      },
      err => { 
    	this.errorMessage = Functions.handleError(err,Constants.Messages.SIGNUP_FAILURE);
        this.toastr.error(this.errorMessage,Constants.Title.SIGNUP);
      }
    );    
  }
  
  get f() { return this.form.controls; }
}