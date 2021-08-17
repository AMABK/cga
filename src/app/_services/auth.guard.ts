import {Constants} from './../_helpers/constants';
import {Functions} from './../_helpers/functions';
import {TokenStorageService} from './token-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public tokenService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

	    if(this.authService.isLoggedIn() !== true) {
	    	if(state.url !== ('/' + this.authService.loginPath)){
				this.router.navigate([this.authService.loginPath]);
	    	}
	    }
	    else{
	    	/* check if user is locked, then redirect to locked page */
	    	if(this.authService.isLocked()){
	    		if(state.url !== ('/' + this.authService.lockPath)){
	    			this.router.navigate([this.authService.lockPath]);
	    		}
	    	}

	    	/* redirect to registration path if signup not complete */
	    	if(this.tokenService.getUserType()=='member' && !this.tokenService.getCompleteSignup()){
	    		let completePath = this.authService.completePath + this.tokenService.getId();
	    		if(!state.url.includes('/' + completePath)){
	    			Functions.alertInfo(Constants.Title.REGISTRATION_PENDING,Constants.Messages.COMPLETE_REGISTRATION);
	    			this.router.navigate([completePath]);
	    		}
	    	}
	    	/* check if user has role to requested page */
	    	if (next.data && next.data.roles && next.data.roles.indexOf(this.tokenService.getUserType()) === -1) {
          this.toastr.error(Constants.Messages.ACCESS_DENIED, Constants.Title.PERMISSION);
	    	  this.router.navigate([this.authService.homePath]);
	    	}
	    }
	    return true;
  }
}
