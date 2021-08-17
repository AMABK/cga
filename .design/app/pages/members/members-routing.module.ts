import {ChooseMemberCategoryComponent} from './add-member/choose-member-category/choose-member-category.component';
import {ChooseMemberTypeComponent} from './add-member/choose-member-type/choose-member-type.component';
import {AddOtherDetailComponent} from './add-member/add-other-detail/add-other-detail.component';
import {AddBasicDetailComponent} from './add-member/add-basic-detail/add-basic-detail.component';
import {NgWizardComponent} from '@cmdap/ng-wizard';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {MembersComponent} from './members/members.component';
import {MemberProfileComponent} from './member-profile/member-profile.component';
import {AuthGuard} from './../../_services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const wizardConfig = {
  name: 'MemberRegisterWizard',
  navBar: {
    icons: {
      previous: '<i class="material-icons ng-wizard-icon">done</i>',
      current: '<i class="material-icons ng-wizard-icon">edit</i>',
      next: '<i class="material-icons ng-wizard-icon">lock</i>',
    },
  }
};

const doneStepOptions = {
  title:'Other Details',
  icon: '<i class="material-icons ng-wizard-icon">done_all</i>',
  buttons: {
	current: {
      
    },
  }
};

const routes: Routes = [
	{ path: '', component: MembersComponent,canActivate:[AuthGuard]},
	{ path: 'register', component:NgWizardComponent,canActivate:[AuthGuard],data: wizardConfig,
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'membership-type' },
		  	{ path: 'membership-type', component: ChooseMemberTypeComponent, data:{ title:'Membership Type'} },
		  	{ path: 'member-category', component: ChooseMemberCategoryComponent, data:{ title:'Member Category'} },	      	      
	      	{ path: 'basic-details', component: AddBasicDetailComponent,data:{ title:'Basic Details'} },
	      	{ path: 'other-details', component: AddOtherDetailComponent,data:doneStepOptions},
	      	{ path: '**', redirectTo: 'membership-type'}
		]
	},
	{ path: 'edit/:id', component:NgWizardComponent,canActivate:[AuthGuard],data: wizardConfig,
		children: [	      	      
		  	{ path: '', pathMatch: 'full', redirectTo: 'basic-details' },
		  	{ path: 'membership-type', component: ChooseMemberTypeComponent, data:{ title:'Membership Type'} },
		  	{ path: 'member-category', component: ChooseMemberCategoryComponent, data:{ title:'Member Category'} },	
 	      	{ path: 'basic-details', component: AddBasicDetailComponent,data:{ title:'Basic Details'} },
 	      	{ path: 'other-details', component: AddOtherDetailComponent,data:doneStepOptions },
 	      	{ path: '**', redirectTo: 'basic-details' }
 		]
	},
	{ path: 'profile/:id', component: MemberProfileComponent, canActivate:[AuthGuard]},
	{ path: 'subscriptions/:id', component: SubscriptionsComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
