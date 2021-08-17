import {BusinessCategoriesComponent} from './business-categories/business-categories.component';
import {AuthGuard} from './../../_services/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SpaceCategoriesComponent} from './space-categories/space-categories.component';
import {ServiceCategoriesComponent} from './service-categories/service-categories.component';
import {MessageTypesComponent} from './message-types/message-types.component';
import {FarmersServedComponent} from './farmers-served/farmers-served.component';
import {CropsComponent} from './crops/crops.component';
import {MemberCategoriesComponent} from './member-categories/member-categories.component';
import {MemberTypesComponent} from './member-types/member-types.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: '', component: DashboardComponent, canActivate:[AuthGuard]},
	{ path: 'crops', component: CropsComponent, canActivate:[AuthGuard]},
	{ path: 'farmers-served', component: FarmersServedComponent, canActivate:[AuthGuard]},
	{ path: 'member-types', component: MemberTypesComponent, canActivate:[AuthGuard]},
	{ path: 'member-categories', component: MemberCategoriesComponent, canActivate:[AuthGuard]},
	{ path: 'message-types', component: MessageTypesComponent, canActivate:[AuthGuard]},
	{ path: 'service-categories', component: ServiceCategoriesComponent, canActivate:[AuthGuard]},
	{ path: 'space-categories', component: SpaceCategoriesComponent, canActivate:[AuthGuard]},
	{ path: 'business-categories', component: BusinessCategoriesComponent, canActivate:[AuthGuard]},
	{ path: 'crops/:id', component: CropsComponent, canActivate:[AuthGuard]},
	{ path: 'farmers-served/:id', component: FarmersServedComponent, canActivate:[AuthGuard]},
	{ path: 'member-types/:id', component: MemberTypesComponent, canActivate:[AuthGuard]},
	{ path: 'member-categories/:id', component: MemberCategoriesComponent, canActivate:[AuthGuard]},
	{ path: 'message-types/:id', component: MessageTypesComponent, canActivate:[AuthGuard]},
	{ path: 'service-categories/:id', component: ServiceCategoriesComponent, canActivate:[AuthGuard]},
	{ path: 'space-categories/:id', component: SpaceCategoriesComponent, canActivate:[AuthGuard]},
	{ path: 'business-categories/:id', component: BusinessCategoriesComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
