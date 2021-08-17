import {AuthGuard} from './_services/auth.guard';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
  	{
  		path: 'auth',
  		loadChildren: './pages/auth/auth.module#AuthModule'
  	},
	{
		path: '',
		redirectTo: 'auth/login',
		pathMatch: 'full'
	},
    {
	    path: '',
	    component: AdminLayoutComponent,
	    canActivate:[AuthGuard],
	    children: [
	        {
		      path: '',
		      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
	  		}
	    ]
	},
    {
    	path: '**',
    	redirectTo: 'auth/login'
	},
	{
		path: 'activity-tracker',
		component: AdminLayoutComponent,
		loadChildren: './pages/activity-tracker/activity-tracker.module#ActivityTrackerModule',
		data: {roles:['superadmin','admin','manager','board']}
	},
	{
		path: 'agripreneurs',
		component: AdminLayoutComponent,
		loadChildren: './pages/agripreneur/agripreneur.module#AgripreneurModule',
		data: {roles:['superadmin','admin','agricoordinator']}
	},
	{
		path: 'members',
		component: AdminLayoutComponent,
		loadChildren: './pages/members/members.module#MembersModule',
		data: {roles:['superadmin','admin','agripreneur','agricoordinator']}
	},
	{
		path: 'transactions',
		component: AdminLayoutComponent,
		loadChildren: './pages/transactions/transactions.module#TransactionsModule',
		data: {roles:['superadmin','admin','member']}
	},
	{
		path: 'services',
		component: AdminLayoutComponent,
		loadChildren: './pages/services/services.module#ServicesModule',
		data: {roles:['superadmin','admin','agripreneur','agricoordinator']}
	},
	{
		path: 'events',
		component: AdminLayoutComponent,
		loadChildren: './pages/events/events.module#EventsModule',
		data: {roles:['superadmin','admin','member','agripreneur','agricoordinator','manager','board']}
	},
	{
		path: 'notifications',
		component: AdminLayoutComponent,
		loadChildren: './pages/notifications/notifications.module#NotificationsModule',
		data: {roles:['superadmin','admin','member','agripreneur','agricoordinator','manager','board']}
	},
	{
		path: 'users',
		component: AdminLayoutComponent,
		loadChildren: './pages/users/users.module#UsersModule',
		data: {roles:['superadmin','admin']}
	},
	{
		path: 'settings',
		component: AdminLayoutComponent,
		loadChildren: './pages/settings/settings.module#SettingsModule',
		data: {roles:['superadmin','admin']}
	}
]
