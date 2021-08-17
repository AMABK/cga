import {ProfileComponent} from './../users/profile/profile.component';
import {LockComponent} from './lock/lock.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AuthGuard} from './../../_services/auth.guard';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {RegisterComponent} from './register/register.component';
import {SecureInnerPagesGuard} from './../../_services/secure-inner-pages.guard';
import {LoginComponent} from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: LoginComponent},
	{ path: 'login', component: LoginComponent,canActivate:[SecureInnerPagesGuard]},	
	{ path: 'register', component: RegisterComponent,canActivate:[SecureInnerPagesGuard]},
	{ path: 'forgot-password', component: ForgotPasswordComponent,canActivate:[SecureInnerPagesGuard]},
	{ path: 'change-password', component: ChangePasswordComponent,canActivate:[AuthGuard]},
	{ path: 'lock', component: LockComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
