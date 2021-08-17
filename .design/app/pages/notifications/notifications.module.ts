import {SharedModule} from './../../shared/shared.module';
import {TemplatesComponent} from './templates/templates.component';
import {FoldersComponent} from './folders/folders.component';
import {NotificationsComponent} from './notifications/notifications.component';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { AddFolderComponent } from './add-folder/add-folder.component';
import { AddTemplateComponent } from './add-template/add-template.component';
import { NgModule } from '@angular/core';
import { SendNotificationComponent } from './send-notification/send-notification.component';

@NgModule({
  declarations: [
	NotificationsComponent,
    FoldersComponent,
    TemplatesComponent,
    AddFolderComponent,
    AddTemplateComponent,
    SendNotificationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
