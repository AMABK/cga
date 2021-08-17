import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import {Functions} from './../../../_helpers/functions';
import {Constants} from './../../../_helpers/constants';
import {TokenStorageService} from './../../../_services/token-storage.service';
import {AuthService} from './../../../_services/auth.service';
import { Component, OnInit, Directive, Renderer2, ElementRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Directive({
  selector: 'body'
})

export class LoginComponent implements OnInit {
  
	form: FormGroup;
	errorMessage: string = '';
	submitted: boolean = false;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

		  	private renderer: Renderer2, 
		    private elmRef: ElementRef, 
	        private authService: AuthService, 
	        private toastr: ToastrService,
	        private tokenStorage: TokenStorageService,
	        private router: Router,
	        private formBuilder: FormBuilder) {this.__componentInspectorService.getComp(this);
 }

  ngOnInit(): void {
	  //add custom class to login body component page
	this.renderer.addClass(this.elmRef.nativeElement, 'login-page');
	
	this.form = this.formBuilder.group({
        Username: ['', Validators.required],
        Password: ['', Validators.required]
    });
	
  }

  onSubmit(): void { 
	this.submitted = true;
    /* stop here if form is invalid */
    if (this.form.invalid) {
    	this.toastr.error(Constants.Messages.CREDENTIALS_REQUIRED,Constants.Title.FORM_VALIDATION);
        return;
    }
   
	this.authService.login(this.form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.toastr.success(Constants.Messages.LOGIN_SUCCESS,Constants.Title.LOGIN);
        this.router.navigate([this.authService.homePath]);
      },
      err => {
    	this.errorMessage = Functions.handleError(err,Constants.Messages.LOGIN_FAILURE);      	
        this.toastr.error(this.errorMessage,Constants.Title.LOGIN);
      }
    );
        
  }
  
  get f() { return this.form.controls; }
}