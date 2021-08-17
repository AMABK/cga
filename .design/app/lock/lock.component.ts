import {ElementSelectionService} from './../element-selection.service';
import {ComponentInspectorService} from './../component-inspector.service';
import { Component, OnInit,  Directive, Renderer2, ElementRef } from '@angular/core';
import { Constants } from './../_helpers/constants';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { Functions } from '../_helpers/functions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})


@Directive({
  selector: 'body'
})

export class LockComponent implements OnInit {
	form: FormGroup;
	errorMessage: string = '';
	submitted: boolean = false;
  
  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
private renderer: Renderer2, 
		    private elmRef: ElementRef,
		    private router: Router, 
		    private authService: AuthService, 
	        private toastr: ToastrService,
		    private tokenStorage: TokenStorageService,
		    private formBuilder: FormBuilder) {this.__componentInspectorService.getComp(this);
 }

  ngOnInit(): void {
	//add custom class to lock body component page
	this.renderer.addClass(this.elmRef.nativeElement, 'lock-page');
	
	this.form = this.formBuilder.group({
	    Password: ['', Validators.required]
	});
  }
  
  onSubmit(): void { 
  	this.submitted = true;
    /* stop here if form is invalid */
    if (this.form.invalid) {
    	this.toastr.error(Constants.Messages.PASSWORD_REQUIRED,Constants.Title.FORM_VALIDATION);
        return;
    }
    
    this.authService.jwtLogin(this.form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.toastr.success(Constants.Messages.LOGIN_SUCCESS,Constants.Title.LOGIN);
        this.router.navigate(['dashboard']);
      },
      err => {
    	this.errorMessage = err && err.error && err.error.message? err.error.message : Constants.Messages.LOGIN_FAILURE;
        this.toastr.error(this.errorMessage,Constants.Title.LOGIN);
      }
    );
        
  }
  
  get f() { return this.form.controls; }

}
