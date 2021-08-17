import {TitleCase} from './../../pipes/title-case';
import {SharedModule} from './../../shared/shared.module';
import {AuthHeaderComponent} from './auth-header/auth-header.component';
import {AuthFooterComponent} from './auth-footer/auth-footer.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LockComponent} from './lock/lock.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
	LoginComponent,
    RegisterComponent,
    LockComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    AuthHeaderComponent,
    AuthFooterComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
