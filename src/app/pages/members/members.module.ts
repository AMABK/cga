import {AddBasicDetailComponent} from './add-member/add-basic-detail/add-basic-detail.component';
import {AddOtherDetailComponent} from './add-member/add-other-detail/add-other-detail.component';
import {ChooseMemberTypeComponent} from './add-member/choose-member-type/choose-member-type.component';
import {ChooseMemberCategoryComponent} from './add-member/choose-member-category/choose-member-category.component';
import {SharedModule} from './../../shared/shared.module';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {MemberProfileComponent} from './member-profile/member-profile.component';
import {MembersComponent} from './members/members.component';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { NgModule } from '@angular/core';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

@NgModule({
  declarations: [
	MembersComponent,
    MemberProfileComponent,
	SubscriptionsComponent,
	ChooseMemberCategoryComponent,
	ChooseMemberTypeComponent,
	AddOtherDetailComponent,
	AddBasicDetailComponent,	
  ],
  imports: [
    CommonModule,
    SharedModule,
    MembersRoutingModule,
    NgWizardModule.forRoot({
    	theme: THEME.default
    })
  ]
})
export class MembersModule { }
