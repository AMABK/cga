import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../_helpers/constants';
import { Functions } from '../_helpers/functions';

const API_BASE = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
	registerPath: string = 'auth/register';
	loginPath: string = 'auth/login';
	changePasswordPath: string = 'auth/change-password';
	forgotPasswordPath: string = 'auth/forgot-password';
	lockPath: string = 'auth/lock';
	profilePath: string = 'users/me';
	completePath: string = 'members/edit/';
	homePath: string = 'dashboard';

  	constructor(private http: HttpClient,
		  private router: Router,
		  private tokenStorage: TokenStorageService,
		  private toastr: ToastrService) { }

	login(data:any): Observable<any> {
		/* check if phone or email supplied then create post based on that */
		if(Functions.isValidEmail(data.Username)){
			data = {email:data.Username,password:data.Password};
			return this.http.post(API_BASE + 'login', data, httpOptions);
		}
		else{
			data = {PhoneNo:data.Username,password:data.Password};
			return this.http.post(API_BASE + 'phone-login', data, httpOptions);
		}
  	}

	unlock(data: any): Observable<any> {
		/* check if phone or email supplied then create post based on that */
		const user = this.tokenStorage.getUser();
		data = {email:(user.email || ''),password:data.Password};
		return this.http.post(API_BASE + 'unlock', data, httpOptions);
  	}

	register(data: any, type: string): Observable<any> {

		data.username = (data.Channel=='sms')? data.PhoneNo : data.email;
		data.UserType = type;

		return this.http.post(API_BASE + 'signup',data, httpOptions);
	}

	changePassword(data: any, Channel: string): Observable<any> {
		data.Channel = Channel;
		return this.http.post(API_BASE + 'change-password',data, httpOptions);
	}

	resetCode(data: any, Channel: string): Observable<any> {
		data.Channel = Channel;
		return this.http.post(API_BASE + 'reset-code',data, httpOptions);
	}

	lock(){
		if(this.isLoggedIn()){
			this.tokenStorage.timeOut();
		}
		this.toastr.success(Constants.Messages.ACCOUNT_LOCK,Constants.Title.LOCK);
		this.router.navigate([this.lockPath]);
	}

	logout(){
		if(this.isLoggedIn()){
			this.tokenStorage.signOut();
		}
		this.toastr.success(Constants.Messages.LOGOUT_SUCCESS,Constants.Title.LOGOUT);
		this.router.navigate([this.loginPath]);
	}

	isLoggedIn(): boolean {
		const user = this.tokenStorage.getUser();
		return (user !== null && user.token) ? true : false;
	}

	isLocked(): boolean {
		const user = this.tokenStorage.getUser();
		return this.isLoggedIn() && user.expired;
	}

}
