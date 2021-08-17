import {AchievementsComponent} from './achievements/achievements.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddProgrammeComponent} from './programmes/add-programme/add-programme.component';
import {ProgrammesComponent} from './programmes/programmes/programmes.component';
import {ActivityKpisComponent} from './activity-kpis/activity-kpis.component';
import {ActivitiesComponent} from './activities/activities.component';
import {AddActivityComponent} from './add-activity/add-activity.component';
import {AuthGuard} from './../../_services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component:DashboardComponent,canActivate:[AuthGuard],data: {roles:['superadmin','admin','manager','board']} },
	{ path: 'activities', component:ActivitiesComponent,canActivate:[AuthGuard],data: {roles:['superadmin','admin','manager','agricoordinator']} },
	{ path: 'add-activity', component: AddActivityComponent, canActivate:[AuthGuard], data: {roles:['superadmin','admin','manager']} },
	{ path: 'edit-activity/:id', component: AddActivityComponent, canActivate:[AuthGuard], data: {roles:['superadmin','admin','manager']} },
	{ path: 'programme-kpis:id', component: ActivityKpisComponent, canActivate:[AuthGuard],data: {roles:['superadmin','admin','manager']} },
	{ path: 'programme-kpis', component: ActivityKpisComponent, canActivate:[AuthGuard],data: {roles:['superadmin','admin','manager']} },
	{ path: 'programmes', component: ProgrammesComponent, canActivate:[AuthGuard],data: {roles:['superadmin','admin','manager']} },
	{ path: 'add-programme', component: AddProgrammeComponent, canActivate:[AuthGuard],data: {roles:['superadmin','admin','manager']} },
	{ path: 'edit-programme/:id', component: AddProgrammeComponent, canActivate:[AuthGuard],data: {roles:['superadmin','admin','manager']} },
	{ path: 'achievements:id', component: AchievementsComponent, canActivate:[AuthGuard],data: {roles:['superadmin','admin','manager','board']} },
	{ path: 'achievements', component: AchievementsComponent, canActivate:[AuthGuard],data: {roles:['superadmin','admin','manager','board']} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityTrackerRoutingModule { }
