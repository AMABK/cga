import {TemplatesComponent} from './templates/templates.component';
import {AddTemplateComponent} from './add-template/add-template.component';
import {AddFolderComponent} from './add-folder/add-folder.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {AuthGuard} from './../../_services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SendNotificationComponent} from "./send-notification/send-notification.component";


const routes: Routes = [
	{ path: '', component: NotificationsComponent,canActivate:[AuthGuard]},
	{ path: 'add-folder', component:AddFolderComponent,canActivate:[AuthGuard]},
	{ path: 'edit-folder/:id', component: AddFolderComponent, canActivate:[AuthGuard]},
	{ path: 'add-template', component:AddTemplateComponent,canActivate:[AuthGuard]},
	{ path: 'edit-template/:id', component: AddTemplateComponent, canActivate:[AuthGuard]},
	{ path: 'templates', component: TemplatesComponent, canActivate:[AuthGuard]},
	{ path: 'send-notification', component: SendNotificationComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
