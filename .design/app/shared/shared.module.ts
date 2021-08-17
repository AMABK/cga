import {OrderBy} from './../pipes/order-by';
import {OnlyNumberDirective} from './../_directives/only-number.directive';
import {OnReturnDirective} from './../_directives/on-return.directive';
import {TitleCase} from './../pipes/title-case';
import {RandomSearch,KeyFilter} from './../pipes/filter';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ToastrModule } from "ngx-toastr";
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { NgWizardModule } from '@cmdap/ng-wizard';

@NgModule({
  declarations:[RandomSearch,KeyFilter,TitleCase,OrderBy,OnReturnDirective,OnlyNumberDirective],
  imports: [
	ReactiveFormsModule,
	NgxMaskModule.forRoot({
		validation: false,
	}),
	ToastrModule.forRoot({
	    timeOut: 4000,
	    positionClass: 'toast-bottom-center',
	    preventDuplicates: true
	}),
	BsDatepickerModule.forRoot(),
	FormsModule,
	NgWizardModule
  ],
  exports: [
	ReactiveFormsModule,
	FormsModule,
	BsDatepickerModule,
	ToastrModule,
	NgxMaskModule,
	NgWizardModule,
	RandomSearch,
	TitleCase,
	OrderBy,
	KeyFilter,
	OnReturnDirective,
	OnlyNumberDirective
  ],
  providers: [TitleCase,OrderBy]
})
export class SharedModule {
	
}