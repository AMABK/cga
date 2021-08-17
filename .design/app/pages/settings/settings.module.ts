import {MemberTypesComponent} from './member-types/member-types.component';
import {SharedModule} from './../../shared/shared.module';
import {MessageTypesComponent} from './message-types/message-types.component';
import {FarmersServedComponent} from './farmers-served/farmers-served.component';
import {SpaceCategoriesComponent} from './space-categories/space-categories.component';
import {CropsComponent} from './crops/crops.component';
import {ServiceCategoriesComponent} from './service-categories/service-categories.component';
import {MemberCategoriesComponent} from './member-categories/member-categories.component';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { BusinessCategoriesComponent } from './business-categories/business-categories.component';

@NgModule({
  declarations: [
	MemberTypesComponent,
	MemberCategoriesComponent,
    ServiceCategoriesComponent,
    CropsComponent,
    SpaceCategoriesComponent,
    FarmersServedComponent,
    MessageTypesComponent,
    DashboardComponent,
    BusinessCategoriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
