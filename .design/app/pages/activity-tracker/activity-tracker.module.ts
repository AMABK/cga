import {AchievementsComponent} from './achievements/achievements.component';
import {SharedModule} from './../../shared/shared.module';
import {ActivityKpisComponent} from './activity-kpis/activity-kpis.component';
import {AddActivityComponent} from './add-activity/add-activity.component';
import {ActivitiesComponent} from './activities/activities.component';
import {AddProgrammeComponent} from './programmes/add-programme/add-programme.component';
import {ProgrammesComponent} from './programmes/programmes/programmes.component';
import { CommonModule } from '@angular/common';

import { ActivityTrackerRoutingModule } from './activity-tracker-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
	ProgrammesComponent,
    AddProgrammeComponent,
    ActivityKpisComponent,
    ActivitiesComponent,
    AddActivityComponent,
    DashboardComponent,
    AchievementsComponent,    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ActivityTrackerRoutingModule
  ]
})
export class ActivityTrackerModule { }
