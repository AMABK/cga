import {DashboardComponent as SettingsDashboard} from './../../pages/settings/dashboard/dashboard.component';
import {Routes} from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    {
    	path: 'dashboard',
    	component: DashboardComponent,
    	data: {roles:['superadmin','admin','manager','board']}
	},
	{
		path: 'agripreneurs',
		loadChildren: './../../pages/agripreneur/agripreneur.module#AgripreneurModule',
    data: {roles:['superadmin','admin','agricoordinator']}
	},
	{
		path: 'activity-tracker',
		loadChildren: './../../pages/activity-tracker/activity-tracker.module#ActivityTrackerModule',
    data: {roles:['superadmin','admin','manager','board']}
	},
	{
		path: 'members',
		loadChildren: './../../pages/members/members.module#MembersModule',
    data: {roles:['superadmin','admin','agripreneur','agricoordinator']}
	},
	{
		path: 'transactions',
		loadChildren: './../../pages/transactions/transactions.module#TransactionsModule',
    data: {roles:['superadmin','admin','member']}
	},
	{
		path: 'services',
		loadChildren: './../../pages/services/services.module#ServicesModule',
    data: {roles:['superadmin','admin','agripreneur','agricoordinator']}
	},
  	{
		path: 'events',
		loadChildren: './../../pages/events/events.module#EventsModule',
      data: {roles:['superadmin','admin','member','agripreneur','agricoordinator','manager','board']}
	},
	{
		path: 'notifications',
		loadChildren: './../../pages/notifications/notifications.module#NotificationsModule',
    data: {roles:['superadmin','admin','member','agripreneur','agricoordinator','manager','board']}
	},
	{
		path: 'users',
		loadChildren: './../../pages/users/users.module#UsersModule',
    data: {roles:['superadmin','admin']}
	},
	{
		path: 'settings',
		loadChildren: './../../pages/settings/settings.module#SettingsModule',
    data: {roles:['superadmin','admin']}
	}
];
