import {TokenStorageService} from './../_services/token-storage.service';
import {AuthService} from './../_services/auth.service';
import { Injectable } from '@angular/core';

import {
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import {tap, retry, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';       

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		  private tokenService: TokenStorageService, 
		  private authService: AuthService,
		  private router: Router) { 
	  
  	}

  	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    	let authReq = req;
    	const token = this.tokenService.getToken();
    	
    	if (token != null) { 
      		authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    	}
    	
    	return next.handle(authReq).pipe( tap(() => {},(err: any) => {
	      if (err instanceof HttpErrorResponse) {	    	  
	        if (err.status !== 401) {	
	            return throwError(err);
	        }
	        if (!req.url.includes(this.authService.loginPath)){
	        	this.authService.logout();
	        }
	      }
	    }));
  	}
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];