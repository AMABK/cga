import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {

  constructor(public authService: AuthService,public router: Router) { 
	  
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
	    if(this.authService.isLoggedIn()) {   
	    	if(this.authService.isLocked()){ 
	    		if(state.url !== ('/' + this.authService.lockPath)){
	       			this.router.navigate([this.authService.lockPath]);
	    		}
	    	}
	    	else{
	    		if(state.url !== ('/' + this.authService.homePath)){
	       			this.router.navigate([this.authService.homePath]);
	    		}
	    	}
	    }
	    return true;
  }

}
